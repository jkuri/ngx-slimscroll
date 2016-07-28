import { Directive, ViewContainerRef } from '@angular/core';
import { getDOM } from '@angular/platform-browser/src/dom/dom_adapter';

@Directive({ 
  selector: '[slimScroll]' 
})
export class SlimScroll {
  private el: any;
  private wrapper: any;
  private bar: any;
  private viewContainer: ViewContainerRef;
  private background: string;
  private opacity: string;
  private width: string;
  private position: string;
  private borderRadius: string;
  private dom = getDOM();

  constructor(viewContainer: ViewContainerRef) {
    this.viewContainer = viewContainer;
    this.el = viewContainer.element.nativeElement;

    let dom = this.dom;
    let el = this.el;

    this.background = dom.getAttribute(el, 'background') || '#000';
    this.opacity = dom.getAttribute(el, 'opacity') || '0.5';
    this.width = dom.getAttribute(el, 'width') || '7px';
    this.position = dom.getAttribute(el, 'position') || 'right';
    this.borderRadius = dom.getAttribute(el, 'border-radius') || '3px';

    this.init();
  }

  private setElementStyle(): void {
    let dom = this.dom;
    let el = this.el;

    dom.setStyle(el, 'overflow', 'hidden');
    dom.setStyle(el, 'position', 'relative');
    dom.setStyle(el, 'display', 'block');
  }

  private wrapContainer(): void {
    this.wrapper = this.dom.createElement('div');
    let dom = this.dom;
    let wrapper = this.wrapper;
    let el = this.el;

    dom.addClass(wrapper, 'slimscroll-wrapper');
    dom.setStyle(wrapper, 'position', 'relative');
    dom.setStyle(wrapper, 'overflow', 'hidden');
    dom.setStyle(wrapper, 'display', 'block');
    dom.setStyle(wrapper, 'margin', dom.getComputedStyle(el).margin);
    dom.setStyle(wrapper, 'width', dom.getComputedStyle(el).width);
    dom.setStyle(wrapper, 'height', dom.getComputedStyle(el).height);

    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
  }

  private initBar(): void {
    this.bar = this.dom.createElement('div');
    let dom = this.dom;
    let bar = this.bar;
    let el = this.el;

    dom.addClass(bar, 'slimscroll-bar');
    dom.setStyle(bar, 'position', 'absolute');
    dom.setStyle(bar, 'top', '0');
    dom.setStyle(bar, this.position, '0');
    dom.setStyle(bar, 'width', this.width);
    dom.setStyle(bar, 'background', this.background);
    dom.setStyle(bar, 'opacity', this.opacity);
    dom.setStyle(bar, 'display', 'block');
    dom.setStyle(bar, 'cursor', 'pointer');
    dom.setStyle(bar, 'z-index', '99');
    dom.setStyle(bar, 'border-radius', this.borderRadius);
    dom.setStyle(bar, 'margin', '1px 0');

    this.wrapper.appendChild(bar);
  }

  private getBarHeight(): void {
    setTimeout(() => {
      let barHeight = Math.max((this.el.offsetHeight / this.el.scrollHeight) * this.el.offsetHeight, 30) + 'px';
      let display = barHeight === this.el.offsetHeight ? 'none' : 'block';

      this.dom.setStyle(this.bar, 'height', barHeight);
      this.dom.setStyle(this.bar, 'display', display);
    }, 1);
  }

  private attachWheel(target): void {
    target.addEventListener('DOMMouseScroll', this.onWheel, false);
    target.addEventListener('mousewheel', this.onWheel, false);
  }

  private onWheel = (e) => {
    let delta = 0;
    let target = e.target || e.srcElement;

    if (e.wheelDelta) { delta = -e.wheelDelta / 120; }
    if (e.detail) { delta = e.detail / 3; }

    this.scrollContent(delta, true, false);

    if (e.preventDefault) { e.preventDefault(); }
  };

  private scrollContent(y: number, isWheel: boolean, isJump: boolean): void {
    let delta = y;
    let maxTop = this.el.offsetHeight - this.bar.offsetHeight;
    let percentScroll;
    let barTop;
    let dom = this.dom;
    let bar = this.bar;
    let el = this.el;

    if (isWheel) {
      delta = parseInt(dom.getStyle(bar, 'top'), 10) + y * 20 / 100 * bar.offsetHeight; 
      delta = Math.min(Math.max(delta, 0), maxTop);
      delta = (y > 0) ? Math.ceil(delta) : Math.floor(delta);
      dom.setStyle(bar, 'top', delta + 'px');
    }

    percentScroll = parseInt(dom.getStyle(bar, 'top'), 10) / (el.offsetHeight - bar.offsetHeight);
    delta = percentScroll * (el.scrollHeight - el.offsetHeight);

    el.scrollTop = delta;
  }

  private makeBarDraggable = () => {
    let body = document.getElementsByTagName('body')[0];
    let el = this.el;
    let bar = this.bar;
    let dom = this.dom;

    bar.addEventListener('mousedown', (e) => {
      let top = parseFloat(dom.getStyle(bar, 'top'));
      let pageY = e.pageY;

      bar.addEventListener('mousemove', () => { this.barDraggableListener(event, top, pageY); }, false);
    }, false);

    bar.addEventListener('mouseup', () => {
      let newBar = bar.cloneNode(true);
      bar.parentNode.replaceChild(newBar, bar);
      this.makeBarDraggable();
    }, false);

    bar.addEventListener('selectstart', (e) => {
      e.preventDefault();
      e.stopPropagation();
    }, false);
  };

  private barDraggableListener = (e, top, pageY) => {
    this.dom.setStyle(this.bar, 'top', top + e.pageY - pageY + 'px');
    this.scrollContent(0, this.bar.offsetTop, false);
  };

  private destroy(): void {
    if (this.dom.hasClass(this.el.parentElement, 'slimscroll-wrapper')) {
      let wrapper = this.el.parentElement;
      let bar = this.dom.getElementsByClassName(this.el, 'slimscroll-bar')[0];
      this.dom.removeChild(this.el, bar);
      this.unwrap(wrapper);
    }
  }

  private unwrap(wrapper): void {
    let docFrag = document.createDocumentFragment();
    while (wrapper.firstChild) {
      let child = wrapper.removeChild(wrapper.firstChild);
      docFrag.appendChild(child);
    }
    wrapper.parentNode.replaceChild(docFrag, wrapper);
  }

  private init(): void {
    this.destroy();
    this.setElementStyle();
    this.wrapContainer();
    this.initBar();
    this.getBarHeight();
    this.attachWheel(this.el);
    this.makeBarDraggable();
  }

}
