import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { SlimScrollEvent } from './../classes/slimscroll-event.class';
import { SlimScrollOptions, ISlimScrollOptions } from './../classes/slimscroll-options.class';
import { Injectable, EventEmitter, Inject, HostListener, Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

export const easing: { [key: string]: Function } = {
  linear: (t: number) => { return t; },
  inQuad: (t: number) => { return t * t; },
  outQuad: (t: number) => { return t * (2 - t ); },
  inOutQuad: (t: number) => { return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t; },
  inCubic: (t: number) => { return t * t * t; },
  outCubic: (t: number) => { return (--t) * t * t + 1; },
  inOutCubic: (t: number) => { return t < .5 ? 4 * t * t * t : (t - 1) * ( 2 * t - 2) * (2 * t - 2) + 1; },
  inQuart: (t: number) => { return t * t * t * t; },
  outQuart: (t: number) => { return 1 - (--t) * t * t * t; },
  inOutQuart: (t: number) => { return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t; },
  inQuint: (t: number) => { return t * t * t * t * t; },
  outQuint: (t: number) => { return 1 + (--t) * t * t * t * t; },
  inOutQuint: (t: number) => { return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t; }
};

@Injectable()
export class SlimScrollService {
  options: SlimScrollOptions;
  scrollEvents: EventEmitter<SlimScrollEvent>;

  el: HTMLElement;
  wrapper: HTMLElement;
  grid: HTMLElement;
  bar: HTMLElement;
  body: HTMLElement;
  pageY: number;
  top: number;
  dragging: boolean;
  mutationThrottleTimeout: number;
  mutationObserver: MutationObserver;
  lastTouchPositionY: number;
  visibleTimeout: any;
  interactionSubscriptions: Subscription = new Subscription();

  private renderer: Renderer2;

  constructor(
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: any
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.body = this.document.querySelector('body');
    this.mutationThrottleTimeout = 50;
  }

  init(el: HTMLElement, options?: ISlimScrollOptions) {
    this.el = el;
    this.options = new SlimScrollOptions(options);
    this.setStyle();
    this.wrapContainer();
    this.initGrid();
    this.initBar();
    this.getBarHeight();
    this.initWheel();
    this.initDrag();

    if (!this.options.alwaysVisible) {
      this.hideBarAndGrid();
    }

    if (MutationObserver) {
      this.mutationObserver = new MutationObserver(() => {
        if (this.mutationThrottleTimeout) {
          clearTimeout(this.mutationThrottleTimeout);
          this.mutationThrottleTimeout = setTimeout(this.onMutation.bind(this), 50);
        }
      });
      this.mutationObserver.observe(this.el, { subtree: true, childList: true });
    }

    if (this.scrollEvents && this.scrollEvents instanceof EventEmitter) {
      const scrollSubscription = this.scrollEvents.subscribe((event: SlimScrollEvent) => this.handleEvent(event));
      this.interactionSubscriptions.add(scrollSubscription);
    }
  }

  handleEvent(e: SlimScrollEvent): void {
    if (e.type === 'scrollToBottom') {
      const y = this.el.scrollHeight - this.el.clientHeight;
      this.scrollTo(y, e.duration, e.easing);
    } else if (e.type === 'scrollToTop') {
      const y = 0;
      this.scrollTo(y, e.duration, e.easing);
    } else if (e.type === 'scrollToPercent' && (e.percent >= 0 && e.percent <= 100)) {
      const y = Math.round(((this.el.scrollHeight - this.el.clientHeight) / 100) * e.percent);
      this.scrollTo(y, e.duration, e.easing);
    } else if (e.type === 'scrollTo') {
      const y = e.y;
      if (y <= this.el.scrollHeight - this.el.clientHeight && y >= 0) {
        this.scrollTo(y, e.duration, e.easing);
      }
    } else if (e.type === 'recalculate') {
      this.getBarHeight();
    }
  }

  setStyle(): void {
    let el = this.el;
    this.renderer.setStyle(el, 'overflow', 'hidden');
    this.renderer.setStyle(el, 'position', 'relative');
    this.renderer.setStyle(el, 'display', 'block');
  }

  onMutation() {
    this.getBarHeight();
  }

  wrapContainer(): void {
    this.wrapper = this.renderer.createElement('div');
    const wrapper = this.wrapper;
    const el = this.el;

    this.renderer.addClass(wrapper, 'slimscroll-wrapper');
    this.renderer.setStyle(wrapper, 'position', 'relative');
    this.renderer.setStyle(wrapper, 'overflow', 'hidden');
    this.renderer.setStyle(wrapper, 'display', 'inline-block');
    this.renderer.setStyle(wrapper, 'margin', getComputedStyle(el).margin);
    this.renderer.setStyle(wrapper, 'width', '100%');
    this.renderer.setStyle(wrapper, 'height', getComputedStyle(el).height);

    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
  }

  initGrid(): void {
    this.grid = this.renderer.createElement('div');
    const grid = this.grid;

    this.renderer.addClass(grid, 'slimscroll-grid');
    this.renderer.setStyle(grid, 'position', 'absolute');
    this.renderer.setStyle(grid, 'top', '0');
    this.renderer.setStyle(grid, 'bottom', '0');
    this.renderer.setStyle(grid, this.options.position, '0');
    this.renderer.setStyle(grid, 'width', `${this.options.gridWidth}px`);
    this.renderer.setStyle(grid, 'background', this.options.gridBackground);
    this.renderer.setStyle(grid, 'opacity', this.options.gridOpacity);
    this.renderer.setStyle(grid, 'display', 'block');
    this.renderer.setStyle(grid, 'cursor', 'pointer');
    this.renderer.setStyle(grid, 'z-index', '99');
    this.renderer.setStyle(grid, 'border-radius', `${this.options.gridBorderRadius}px`);
    this.renderer.setStyle(grid, 'margin', this.options.gridMargin);

    this.wrapper.appendChild(grid);
  }

  initBar(): void {
    this.bar = this.renderer.createElement('div');
    const bar = this.bar;

    this.renderer.addClass(bar, 'slimscroll-bar');
    this.renderer.setStyle(bar, 'position', 'absolute');
    this.renderer.setStyle(bar, 'top', '0');
    this.renderer.setStyle(bar, this.options.position, '0');
    this.renderer.setStyle(bar, 'width', `${this.options.barWidth}px`);
    this.renderer.setStyle(bar, 'background', this.options.barBackground);
    this.renderer.setStyle(bar, 'opacity', this.options.barOpacity);
    this.renderer.setStyle(bar, 'display', 'block');
    this.renderer.setStyle(bar, 'cursor', 'pointer');
    this.renderer.setStyle(bar, 'z-index', '100');
    this.renderer.setStyle(bar, 'border-radius', `${this.options.barBorderRadius}px`);
    this.renderer.setStyle(bar, 'margin', this.options.barMargin);

    this.wrapper.appendChild(bar);
  }

  getBarHeight(): void {
    const barHeight = Math.max((this.el.offsetHeight / this.el.scrollHeight) * this.el.offsetHeight, 30) + 'px';
    const display = parseInt(barHeight, 10) === this.el.offsetHeight ? 'none' : 'block';

    this.renderer.setStyle(this.bar, 'height', barHeight);
    this.renderer.setStyle(this.bar, 'display', display);
    this.renderer.setStyle(this.grid, 'display', display);
  }

  scrollTo(y: number, duration: number, easingFunc: string): void {
    let start = Date.now();
    let from = this.el.scrollTop;
    let maxTop = this.el.offsetHeight - this.bar.offsetHeight;
    let maxElScrollTop = this.el.scrollHeight - this.el.clientHeight;
    let barHeight = Math.max((this.el.offsetHeight / this.el.scrollHeight) * this.el.offsetHeight, 30);
    const paddingTop = parseInt(this.el.style.paddingTop, 10) || 0;
    const paddingBottom = parseInt(this.el.style.paddingBottom, 10) || 0;

    let scroll = (timestamp: number) => {
      let currentTime = Date.now();
      let time = Math.min(1, ((currentTime - start) / duration));
      let easedTime = easing[easingFunc](time);

      if (paddingTop > 0 || paddingBottom > 0) {
        let fromY = null;

        if (paddingTop > 0) {
          fromY = -paddingTop;
          fromY = -((easedTime * (y - fromY)) + fromY);
          this.renderer.setStyle(this.el, 'paddingTop', `${fromY}px`);
        }

        if (paddingBottom > 0) {
          fromY = paddingBottom;
          fromY = ((easedTime * (y - fromY)) + fromY);
          this.renderer.setStyle(this.el, 'paddingBottom', `${fromY}px`);
        }
      } else {
        this.el.scrollTop = (easedTime * (y - from)) + from;
      }

      let percentScroll = this.el.scrollTop / maxElScrollTop;
      if (paddingBottom === 0) {
        let delta = Math.round(Math.round(this.el.clientHeight * percentScroll) - barHeight);
        if (delta > 0) {
          this.renderer.setStyle(this.bar, 'top', `${delta}px`);
        }
      }

      if (time < 1) {
        requestAnimationFrame(scroll);
      }
    };

    requestAnimationFrame(scroll);
  }

  scrollContent(y: number, isWheel: boolean, isJump: boolean): null | number {
    let delta = y;
    let maxTop = this.el.offsetHeight - this.bar.offsetHeight;
    let percentScroll: number;
    let over = null;

    if (isWheel) {
      delta = parseInt(getComputedStyle(this.bar).top, 10) + y * 20 / 100 * this.bar.offsetHeight;

      if (delta < 0 || delta > maxTop) {
        over = delta > maxTop ? delta - maxTop : delta;
      }

      delta = Math.min(Math.max(delta, 0), maxTop);
      delta = (y > 0) ? Math.ceil(delta) : Math.floor(delta);
      this.renderer.setStyle(this.bar, 'top', delta + 'px');
    }

    percentScroll = parseInt(getComputedStyle(this.bar).top, 10) / (this.el.offsetHeight - this.bar.offsetHeight);
    delta = percentScroll * (this.el.scrollHeight - this.el.offsetHeight);

    this.el.scrollTop = delta;

    this.showBarAndGrid();

    if (!this.options.alwaysVisible) {
      if (this.visibleTimeout) {
        clearTimeout(this.visibleTimeout);
      }

      this.visibleTimeout = setTimeout(() => {
        this.hideBarAndGrid();
      }, this.options.visibleTimeout);
    }

    return over;
  }

  initWheel = () => {
    const dommousescroll = Observable.fromEvent(this.el, 'DOMMouseScroll');
    const mousewheel = Observable.fromEvent(this.el, 'mousewheel');

    const wheelSubscription = Observable.merge(...[dommousescroll, mousewheel]).subscribe((e: MouseWheelEvent) => {
      let delta = 0;

      if (e.wheelDelta) {
        delta = -e.wheelDelta / 120;
      }

      if (e.detail) {
        delta = e.detail / 3;
      }

      this.scrollContent(delta, true, false);

      if (e.preventDefault) {
        e.preventDefault();
      }
    });
    this.interactionSubscriptions.add(wheelSubscription);
  }

  initDrag = () => {
    const bar = this.bar;

    const mousemove = Observable.fromEvent(this.document.documentElement, 'mousemove');
    const touchmove = Observable.fromEvent(this.document.documentElement, 'touchmove');

    const mousedown = Observable.fromEvent(bar, 'mousedown');
    const touchstart = Observable.fromEvent(this.el, 'touchstart');
    const mouseup = Observable.fromEvent(this.document.documentElement, 'mouseup');
    const touchend = Observable.fromEvent(this.document.documentElement, 'touchend');

    const mousedrag = mousedown.mergeMap((e: MouseEvent) => {
      this.pageY = e.pageY;
      this.top = parseFloat(getComputedStyle(bar).top);

      return mousemove.map((emove: MouseEvent) => {
        emove.preventDefault();
        return this.top + emove.pageY - this.pageY;
      }).takeUntil(mouseup);
    });

    const touchdrag = touchstart.mergeMap((e: TouchEvent) => {
      this.pageY = e.targetTouches[0].pageY;
      this.top = -parseFloat(getComputedStyle(bar).top);

      return touchmove.map((tmove: TouchEvent) => {
        return -(this.top + tmove.targetTouches[0].pageY - this.pageY);
      }).takeUntil(touchend);
    });

    const dragSubscription = Observable.merge(...[mousedrag, touchdrag]).subscribe((top: number) => {
      this.body.addEventListener('selectstart', this.preventDefaultEvent, false);
      this.renderer.setStyle(this.body, 'touch-action', 'pan-y');
      this.renderer.setStyle(this.body, 'user-select', 'none');
      this.renderer.setStyle(this.bar, 'top', `${top}px`);
      let over = this.scrollContent(0, true, false);
      let maxTop = this.el.offsetHeight - this.bar.offsetHeight;

      if (over && over < 0 && -over <= maxTop) {
        this.renderer.setStyle(this.el, 'paddingTop', -over + 'px');
      } else if (over && over > 0 && over <= maxTop) {
        this.renderer.setStyle(this.el, 'paddingBottom', over + 'px');
      }
    });

    const dragEndSubscription = Observable.merge(...[mouseup, touchend]).subscribe(() => {
      this.body.removeEventListener('selectstart', this.preventDefaultEvent, false);
      const paddingTop = parseInt(this.el.style.paddingTop, 10);
      const paddingBottom = parseInt(this.el.style.paddingBottom, 10);
      this.renderer.setStyle(this.body, 'touch-action', 'unset');
      this.renderer.setStyle(this.body, 'user-select', 'default');

      if (paddingTop > 0) {
        this.scrollTo(0, 300, 'linear');
      } else if (paddingBottom > 0) {
        this.scrollTo(0, 300, 'linear');
      }
    });

    this.interactionSubscriptions.add(dragSubscription);
    this.interactionSubscriptions.add(dragEndSubscription);
  }

  showBarAndGrid(): void {
    this.renderer.setStyle(this.grid, 'background', this.options.gridBackground);
    this.renderer.setStyle(this.bar, 'background', this.options.barBackground);
  }

  hideBarAndGrid(): void {
    this.renderer.setStyle(this.grid, 'background', 'transparent');
    this.renderer.setStyle(this.bar, 'background', 'transparent');
  }

  preventDefaultEvent = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }

  destroy(): void {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
      this.mutationObserver = null;
    }

    if (this.el.parentElement.classList.contains('slimscroll-wrapper')) {
      let wrapper = this.el.parentElement;
      let bar = this.el.querySelector('.slimscroll-bar');
      this.el.removeChild(bar);
      this.unwrap(wrapper);
    }
  }

  unwrap(wrapper: HTMLElement): void {
    let docFrag = document.createDocumentFragment();
    while (wrapper.firstChild) {
      let child = wrapper.removeChild(wrapper.firstChild);
      docFrag.appendChild(child);
    }
    wrapper.parentNode.replaceChild(docFrag, wrapper);
  }

  @HostListener('window:resize', ['$event'])
  onResize($event: any) {
    this.getBarHeight();
  }
}
