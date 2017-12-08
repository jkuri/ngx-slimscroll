import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { SlimScrollEvent } from './../classes/slimscroll-event.class';
import { SlimScrollOptions, ISlimScrollOptions } from './../classes/slimscroll-options.class';
import { Injectable, EventEmitter, Inject, HostListener, Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { SlimScrollObject } from '../classes/slimscroll-object.class';

export const easing: { [key: string]: Function } = {
  linear: (t: number) => t,
  inQuad: (t: number) => t * t,
  outQuad: (t: number) => t * (2 - t ),
  inOutQuad: (t: number) => t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  inCubic: (t: number) => t * t * t,
  outCubic: (t: number) => (--t) * t * t + 1,
  inOutCubic: (t: number) => t < .5 ? 4 * t * t * t : (t - 1) * ( 2 * t - 2) * (2 * t - 2) + 1,
  inQuart: (t: number) => t * t * t * t,
  outQuart: (t: number) => 1 - (--t) * t * t * t,
  inOutQuart: (t: number) => t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t,
  inQuint: (t: number) => t * t * t * t * t,
  outQuint: (t: number) => 1 + (--t) * t * t * t * t,
  inOutQuint: (t: number) => t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t
};

@Injectable()
export class SlimScrollService {
  scrollEvents: EventEmitter<SlimScrollEvent>;
  private renderer: Renderer2;

  constructor(
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: any
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  init(el: HTMLElement, options?: ISlimScrollOptions) {
    let obj: SlimScrollObject = new SlimScrollObject(el);
    obj.body = this.document.querySelector('body');
    obj.mutationThrottleTimeout = 50;
    obj.options = new SlimScrollOptions(options);
    this.setStyle(obj);
    obj = this.wrapContainer(obj);
    obj = this.initGrid(obj);
    obj = this.initBar(obj);
    this.getBarHeight(obj);
    obj = this.initWheel(obj);
    obj = this.initDrag(obj);

    if (!obj.options.alwaysVisible) {
      this.hideBarAndGrid(obj);
    }

    if (MutationObserver) {
      obj.mutationObserver = new MutationObserver(() => {
        if (obj.mutationThrottleTimeout) {
          clearTimeout(obj.mutationThrottleTimeout);
          obj.mutationThrottleTimeout = setTimeout(this.onMutation.bind(obj), 50);
        }
      });
      obj.mutationObserver.observe(obj.el, { subtree: true, childList: true });
    }

    const event = new SlimScrollEvent({type: 'recalculate'});
    this.handleEvent(obj, event);

    return obj;
  }

  handleEvent(obj: SlimScrollObject, e: SlimScrollEvent): void {
    if (e.type === 'scrollToBottom') {
      const y = obj.el.scrollHeight - obj.el.clientHeight;
      this.scrollTo(obj, y, e.duration, e.easing);
    } else if (e.type === 'scrollToTop') {
      const y = 0;
      this.scrollTo(obj, y, e.duration, e.easing);
    } else if (e.type === 'scrollToPercent' && (e.percent >= 0 && e.percent <= 100)) {
      const y = Math.round(((obj.el.scrollHeight - obj.el.clientHeight) / 100) * e.percent);
      this.scrollTo(obj, y, e.duration, e.easing);
    } else if (e.type === 'scrollTo') {
      const y = e.y;
      if (y <= obj.el.scrollHeight - obj.el.clientHeight && y >= 0) {
        this.scrollTo(obj, y, e.duration, e.easing);
      }
    } else if (e.type === 'recalculate') {
      this.getBarHeight(obj);
    }
  }

  setStyle(obj: SlimScrollObject): void {
    const el = obj.el;
    this.renderer.setStyle(el, 'overflow', 'hidden');
    this.renderer.setStyle(el, 'position', 'relative');
    this.renderer.setStyle(el, 'display', 'block');
  }

  onMutation(obj: SlimScrollObject) {
    this.getBarHeight(obj);
  }

  wrapContainer(obj: SlimScrollObject): SlimScrollObject {
    obj.wrapper = this.renderer.createElement('div');
    const wrapper = obj.wrapper;
    const el = obj.el;

    this.renderer.addClass(wrapper, 'slimscroll-wrapper');
    this.renderer.setStyle(wrapper, 'position', 'relative');
    this.renderer.setStyle(wrapper, 'overflow', 'hidden');
    this.renderer.setStyle(wrapper, 'display', 'inline-block');
    this.renderer.setStyle(wrapper, 'margin', getComputedStyle(el).margin);
    this.renderer.setStyle(wrapper, 'width', '100%');
    this.renderer.setStyle(wrapper, 'height', getComputedStyle(el).height);

    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);

    return obj;
  }

  initGrid(obj: SlimScrollObject): SlimScrollObject {
    obj.grid = this.renderer.createElement('div');
    const grid = obj.grid;

    this.renderer.addClass(grid, 'slimscroll-grid');
    this.renderer.setStyle(grid, 'position', 'absolute');
    this.renderer.setStyle(grid, 'top', '0');
    this.renderer.setStyle(grid, 'bottom', '0');
    this.renderer.setStyle(grid, obj.options.position, '0');
    this.renderer.setStyle(grid, 'width', `${obj.options.gridWidth}px`);
    this.renderer.setStyle(grid, 'background', obj.options.gridBackground);
    this.renderer.setStyle(grid, 'opacity', obj.options.gridOpacity);
    this.renderer.setStyle(grid, 'display', 'block');
    this.renderer.setStyle(grid, 'cursor', 'pointer');
    this.renderer.setStyle(grid, 'z-index', '99');
    this.renderer.setStyle(grid, 'border-radius', `${obj.options.gridBorderRadius}px`);
    this.renderer.setStyle(grid, 'margin', obj.options.gridMargin);

    obj.wrapper.appendChild(grid);

    return obj;
  }

  initBar(obj: SlimScrollObject): SlimScrollObject {
    obj.bar = this.renderer.createElement('div');
    const bar = obj.bar;

    this.renderer.addClass(bar, 'slimscroll-bar');
    this.renderer.setStyle(bar, 'position', 'absolute');
    this.renderer.setStyle(bar, 'top', '0');
    this.renderer.setStyle(bar, obj.options.position, '0');
    this.renderer.setStyle(bar, 'width', `${obj.options.barWidth}px`);
    this.renderer.setStyle(bar, 'background', obj.options.barBackground);
    this.renderer.setStyle(bar, 'opacity', obj.options.barOpacity);
    this.renderer.setStyle(bar, 'display', 'block');
    this.renderer.setStyle(bar, 'cursor', 'pointer');
    this.renderer.setStyle(bar, 'z-index', '100');
    this.renderer.setStyle(bar, 'border-radius', `${obj.options.barBorderRadius}px`);
    this.renderer.setStyle(bar, 'margin', obj.options.barMargin);

    obj.wrapper.appendChild(bar);

    return obj;
  }

  getBarHeight(obj: SlimScrollObject): void {
    const barHeight = Math.max((obj.el.offsetHeight / obj.el.scrollHeight) * obj.el.offsetHeight, 30) + 'px';
    const display = parseInt(barHeight, 10) === obj.el.offsetHeight ? 'none' : 'block';

    this.renderer.setStyle(obj.bar, 'height', barHeight);
    this.renderer.setStyle(obj.bar, 'display', display);
    this.renderer.setStyle(obj.grid, 'display', display);
  }

  scrollTo(obj: SlimScrollObject, y: number, duration: number, easingFunc: string): void {
    const start = Date.now();
    const from = obj.el.scrollTop;
    const maxTop = obj.el.offsetHeight - obj.bar.offsetHeight;
    const maxElScrollTop = obj.el.scrollHeight - obj.el.clientHeight;
    const barHeight = Math.max((obj.el.offsetHeight / obj.el.scrollHeight) * obj.el.offsetHeight, 30);
    const paddingTop = parseInt(obj.el.style.paddingTop, 10) || 0;
    const paddingBottom = parseInt(obj.el.style.paddingBottom, 10) || 0;

    const scroll = (timestamp: number) => {
      const currentTime = Date.now();
      const time = Math.min(1, ((currentTime - start) / duration));
      const easedTime = easing[easingFunc](time);

      if (paddingTop > 0 || paddingBottom > 0) {
        let fromY = null;

        if (paddingTop > 0) {
          fromY = -paddingTop;
          fromY = -((easedTime * (y - fromY)) + fromY);
          this.renderer.setStyle(obj.el, 'paddingTop', `${fromY}px`);
        }

        if (paddingBottom > 0) {
          fromY = paddingBottom;
          fromY = ((easedTime * (y - fromY)) + fromY);
          this.renderer.setStyle(obj.el, 'paddingBottom', `${fromY}px`);
        }
      } else {
        obj.el.scrollTop = (easedTime * (y - from)) + from;
      }

      const percentScroll = obj.el.scrollTop / maxElScrollTop;
      if (paddingBottom === 0) {
        const delta = Math.round(Math.round(obj.el.clientHeight * percentScroll) - barHeight);
        if (delta > 0) {
          this.renderer.setStyle(obj.bar, 'top', `${delta}px`);
        }
      }

      if (time < 1) {
        requestAnimationFrame(scroll);
      }
    };

    requestAnimationFrame(scroll);
  }

  scrollContent(obj: SlimScrollObject, y: number, isWheel: boolean, isJump: boolean): null | number {
    let delta = y;
    const maxTop = obj.el.offsetHeight - obj.bar.offsetHeight;
    let percentScroll: number;
    let over = null;

    if (isWheel) {
      delta = parseInt(getComputedStyle(obj.bar).top, 10) + y * 20 / 100 * obj.bar.offsetHeight;

      if (delta < 0 || delta > maxTop) {
        over = delta > maxTop ? delta - maxTop : delta;
      }

      delta = Math.min(Math.max(delta, 0), maxTop);
      delta = (y > 0) ? Math.ceil(delta) : Math.floor(delta);
      this.renderer.setStyle(obj.bar, 'top', delta + 'px');
    }

    percentScroll = parseInt(getComputedStyle(obj.bar).top, 10) / (obj.el.offsetHeight - obj.bar.offsetHeight);
    delta = percentScroll * (obj.el.scrollHeight - obj.el.offsetHeight);

    obj.el.scrollTop = delta;

    this.showBarAndGrid(obj);

    if (!obj.options.alwaysVisible) {
      if (obj.visibleTimeout) {
        clearTimeout(obj.visibleTimeout);
      }

      obj.visibleTimeout = setTimeout(() => {
        this.hideBarAndGrid(obj);
      }, obj.options.visibleTimeout);
    }

    return over;
  }

  initWheel = (obj: SlimScrollObject) => {
    const dommousescroll = Observable.fromEvent(obj.el, 'DOMMouseScroll');
    const mousewheel = Observable.fromEvent(obj.el, 'mousewheel');

    const wheelSubscription = Observable.merge(...[dommousescroll, mousewheel]).subscribe((e: MouseWheelEvent) => {
      let delta = 0;

      if (e.wheelDelta) {
        delta = -e.wheelDelta / 120;
      }

      if (e.detail) {
        delta = e.detail / 3;
      }

      this.scrollContent(obj, delta, true, false);

      if (e.preventDefault) {
        e.preventDefault();
      }
    });
    obj.interactionSubscriptions.add(wheelSubscription);

    return obj;
  }

  initDrag = (obj: SlimScrollObject) => {
    const bar = obj.bar;

    const mousemove = Observable.fromEvent(this.document.documentElement, 'mousemove');
    const touchmove = Observable.fromEvent(this.document.documentElement, 'touchmove');

    const mousedown = Observable.fromEvent(bar, 'mousedown');
    const touchstart = Observable.fromEvent(obj.el, 'touchstart');
    const mouseup = Observable.fromEvent(this.document.documentElement, 'mouseup');
    const touchend = Observable.fromEvent(this.document.documentElement, 'touchend');

    const mousedrag = mousedown.mergeMap((e: MouseEvent) => {
      obj.pageY = e.pageY;
      obj.top = parseFloat(getComputedStyle(bar).top);

      return mousemove.map((emove: MouseEvent) => {
        emove.preventDefault();
        return obj.top + emove.pageY - obj.pageY;
      }).takeUntil(mouseup);
    });

    const touchdrag = touchstart.mergeMap((e: TouchEvent) => {
      obj.pageY = e.targetTouches[0].pageY;
      obj.top = -parseFloat(getComputedStyle(bar).top);

      return touchmove.map((tmove: TouchEvent) => {
        return -(obj.top + tmove.targetTouches[0].pageY - obj.pageY);
      }).takeUntil(touchend);
    });

    const dragSubscription = Observable.merge(...[mousedrag, touchdrag]).subscribe((top: number) => {
      obj.body.addEventListener('selectstart', this.preventDefaultEvent, false);
      this.renderer.setStyle(obj.body, 'touch-action', 'pan-y');
      this.renderer.setStyle(obj.body, 'user-select', 'none');
      this.renderer.setStyle(obj.bar, 'top', `${top}px`);
      const over = this.scrollContent(obj, 0, true, false);
      const maxTop = obj.el.offsetHeight - obj.bar.offsetHeight;

      if (over && over < 0 && -over <= maxTop) {
        this.renderer.setStyle(obj.el, 'paddingTop', -over + 'px');
      } else if (over && over > 0 && over <= maxTop) {
        this.renderer.setStyle(obj.el, 'paddingBottom', over + 'px');
      }
    });

    const dragEndSubscription = Observable.merge(...[mouseup, touchend]).subscribe(() => {
      obj.body.removeEventListener('selectstart', this.preventDefaultEvent, false);
      const paddingTop = parseInt(obj.el.style.paddingTop, 10);
      const paddingBottom = parseInt(obj.el.style.paddingBottom, 10);
      this.renderer.setStyle(obj.body, 'touch-action', 'unset');
      this.renderer.setStyle(obj.body, 'user-select', 'default');

      if (paddingTop > 0) {
        this.scrollTo(obj, 0, 300, 'linear');
      } else if (paddingBottom > 0) {
        this.scrollTo(obj, 0, 300, 'linear');
      }
    });

    obj.interactionSubscriptions.add(dragSubscription);
    obj.interactionSubscriptions.add(dragEndSubscription);

    return obj;
  }

  showBarAndGrid(obj: SlimScrollObject): void {
    this.renderer.setStyle(obj.grid, 'background', obj.options.gridBackground);
    this.renderer.setStyle(obj.bar, 'background', obj.options.barBackground);
  }

  hideBarAndGrid(obj: SlimScrollObject): void {
    this.renderer.setStyle(obj.grid, 'background', 'transparent');
    this.renderer.setStyle(obj.bar, 'background', 'transparent');
  }

  preventDefaultEvent = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }

  destroy(obj: SlimScrollObject): void {
    if (obj.mutationObserver) {
      obj.mutationObserver.disconnect();
      obj.mutationObserver = null;
    }

    if (obj.el.parentElement.classList.contains('slimscroll-wrapper')) {
      const wrapper = obj.el.parentElement;
      const bar = obj.el.querySelector('.slimscroll-bar');
      obj.el.removeChild(bar);
      this.unwrap(wrapper);
    }
  }

  unwrap(wrapper: HTMLElement): void {
    const docFrag = document.createDocumentFragment();
    while (wrapper.firstChild) {
      const child = wrapper.removeChild(wrapper.firstChild);
      docFrag.appendChild(child);
    }
    wrapper.parentNode.replaceChild(docFrag, wrapper);
  }

  // @HostListener('window:resize', ['$event'])
  // onResize($event: any) {
  //   this.getBarHeight();
  // }
}
