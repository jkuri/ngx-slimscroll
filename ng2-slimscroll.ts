import {Directive, ViewContainerRef} from 'angular2/core';
import {BrowserDomAdapter} from 'angular2/platform/browser';

@Directive({
  selector: '[slimscroll]'
})

export class SlimScroll {
  el: any;
  wrapper: any;
  bar: any;
  viewContainer: ViewContainerRef;
  dom = new BrowserDomAdapter();

  background: string;
  opacity: string;
  width: string;
  position: string;

  constructor(viewContainer: ViewContainerRef) {
    this.viewContainer = viewContainer;
    this.el = viewContainer.element.nativeElement;
    this.background = this.dom.getAttribute(this.el, 'background') || '#000000';
    this.opacity = this.dom.getAttribute(this.el, 'opacity') || '0.5';
    this.width = this.dom.getAttribute(this.el, 'width') || '7px';
    this.position = this.dom.getAttribute(this.el, 'position') || 'right';
    console.log(this.background);
    this.init();
  }

  setElementStyle() {
    this.dom.setStyle(this.el, 'overflow', 'hidden');
    this.dom.setStyle(this.el, 'width', this.dom.getStyle(this.el, 'width'));
    this.dom.setStyle(this.el, 'height', this.dom.getStyle(this.el, 'height'));
  }

  wrapContainer() {
    this.wrapper = this.dom.createElement('div');
    this.dom.addClass(this.wrapper, 'slimscroll-wrapper');
    this.dom.setStyle(this.wrapper, 'position', 'relative');
    this.dom.setStyle(this.wrapper, 'overflow', 'hidden');
    this.dom.setStyle(this.wrapper, 'width', this.dom.getStyle(this.el, 'width'));
    this.dom.setStyle(this.wrapper, 'height', this.dom.getStyle(this.el, 'height'));
    this.dom.setStyle(this.wrapper, 'margin', this.dom.getStyle(this.el, 'margin'));

    this.el.parentNode.insertBefore(this.wrapper, this.el);
    this.wrapper.appendChild(this.el);
  }

  initBar() {
    this.bar = this.dom.createElement('div');
    this.dom.addClass(this.bar, 'slimscroll-bar');
    this.dom.setStyle(this.bar, 'position', 'absolute');
    this.dom.setStyle(this.bar, 'top', '0');
    this.dom.setStyle(this.bar, this.position, '1px');
    this.dom.setStyle(this.bar, 'width', this.width);
    this.dom.setStyle(this.bar, 'background', this.background);
    this.dom.setStyle(this.bar, 'opacity', this.opacity);
    this.dom.setStyle(this.bar, 'display', 'block');
    this.dom.setStyle(this.bar, 'cursor', 'pointer');
    this.dom.setStyle(this.bar, 'z-index', '99');
    this.dom.setStyle(this.bar, 'border-radius', '3px');

    this.el.appendChild(this.bar);
  }

  getBarHeight() {
    let barHeight = Math.max((this.el.offsetHeight / this.el.scrollHeight) * this.el.offsetHeight, 30) + 'px';
    let display = barHeight === this.el.offsetHeight ? 'none' : 'block';
    this.dom.setStyle(this.bar, 'height', barHeight);
    this.dom.setStyle(this.bar, 'display', display);
  }

  attachWheel(target) {
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

  scrollContent(y, isWheel, isJump) {
    let delta = y;
    let maxTop = this.el.offsetHeight - this.bar.offsetHeight;
    let percentScroll;
    let barTop;

    if (isWheel) {
        delta = parseInt(this.dom.getStyle(this.bar, 'top'), 10) + y * 20 / 100 * this.bar.offsetHeight;
        delta = Math.min(Math.max(delta, 0), maxTop);
        delta = (y > 0) ? Math.ceil(delta) : Math.floor(delta);
        this.dom.setStyle(this.bar, 'top', delta + 'px');
    }

    percentScroll = parseInt(this.dom.getStyle(this.bar, 'top'), 10) / (this.el.offsetHeight - this.bar.offsetHeight);
    delta = percentScroll * (this.el.scrollHeight - this.el.offsetHeight);

    this.el.scrollTop = delta;
  }

  private makeBarDraggable = () => {
    let body = document.getElementsByTagName('body')[0];

    this.bar = this.dom.getElementsByClassName(this.el, 'slimscroll-bar')[0];

    this.bar.addEventListener('mousedown', (e) => {
      let top = parseFloat(this.dom.getStyle(this.bar, 'top'));
      let pageY = e.pageY;

      this.bar.addEventListener('mousemove', () => { this.barDraggableListener(event, top, pageY); }, false);
    }, false);

    this.bar.addEventListener('mouseup', () => {
      let newBar = this.bar.cloneNode(true);
      this.bar.parentNode.replaceChild(newBar, this.bar);
      this.makeBarDraggable();
    }, false);

    this.bar.addEventListener('selectstart', (e) => {
      e.preventDefault();
      e.stopPropagation();
    }, false);
  };

  private barDraggableListener = (e, top, pageY) => {
    this.dom.setStyle(this.bar, 'top', top + e.pageY - pageY + 'px');
    this.scrollContent(0, this.bar.offsetTop, false);
  };

  destroy() {
    if (this.dom.hasClass(this.el.parentElement, 'slimscroll-wrapper')) {
      let wrapper = this.el.parentElement;
      let bar = this.dom.getElementsByClassName(this.el, 'slimscroll-bar')[0];
      this.dom.removeChild(this.el, bar);
      this.unwrap(wrapper);
    }
  }

  unwrap(wrapper) {
    var docFrag = document.createDocumentFragment();
    while (wrapper.firstChild) {
      var child = wrapper.removeChild(wrapper.firstChild);
      docFrag.appendChild(child);
    }
    wrapper.parentNode.replaceChild(docFrag, wrapper);
  }

  init() {
    this.destroy();
    this.setElementStyle();
    this.wrapContainer();
    this.initBar();
    this.getBarHeight();
    this.attachWheel(this.el);
    this.makeBarDraggable();
  }

}
