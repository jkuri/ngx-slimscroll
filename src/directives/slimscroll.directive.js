var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var browser_1 = require('angular2/platform/browser');
var SlimScroll = (function () {
    function SlimScroll(viewContainer) {
        var _this = this;
        this.dom = new browser_1.BrowserDomAdapter();
        this.onWheel = function (e) {
            var delta = 0;
            var target = e.target || e.srcElement;
            if (e.wheelDelta) {
                delta = -e.wheelDelta / 120;
            }
            if (e.detail) {
                delta = e.detail / 3;
            }
            _this.scrollContent(delta, true, false);
            if (e.preventDefault) {
                e.preventDefault();
            }
        };
        this.makeBarDraggable = function () {
            var body = document.getElementsByTagName('body')[0];
            var el = _this.el;
            var bar = _this.bar;
            var dom = _this.dom;
            bar = dom.getElementsByClassName(el, 'slimscroll-bar')[0];
            bar.addEventListener('mousedown', function (e) {
                var top = parseFloat(dom.getStyle(bar, 'top'));
                var pageY = e.pageY;
                bar.addEventListener('mousemove', function () { _this.barDraggableListener(event, top, pageY); }, false);
            }, false);
            bar.addEventListener('mouseup', function () {
                var newBar = bar.cloneNode(true);
                bar.parentNode.replaceChild(newBar, bar);
                _this.makeBarDraggable();
            }, false);
            bar.addEventListener('selectstart', function (e) {
                e.preventDefault();
                e.stopPropagation();
            }, false);
        };
        this.barDraggableListener = function (e, top, pageY) {
            _this.dom.setStyle(_this.bar, 'top', top + e.pageY - pageY + 'px');
            _this.scrollContent(0, _this.bar.offsetTop, false);
        };
        this.viewContainer = viewContainer;
        this.el = viewContainer.element.nativeElement;
        var dom = this.dom;
        var el = this.el;
        this.background = dom.getAttribute(el, 'background') || '#000';
        this.opacity = dom.getAttribute(el, 'opacity') || '0.5';
        this.width = dom.getAttribute(el, 'width') || '7px';
        this.position = dom.getAttribute(el, 'position') || 'right';
        this.borderRadius = dom.getAttribute(el, 'border-radius') || '3px';
        this.init();
    }
    SlimScroll.prototype.setElementStyle = function () {
        var dom = this.dom;
        var el = this.el;
        dom.setStyle(el, 'overflow', 'hidden');
    };
    SlimScroll.prototype.wrapContainer = function () {
        this.wrapper = this.dom.createElement('div');
        var dom = this.dom;
        var wrapper = this.wrapper;
        var el = this.el;
        dom.addClass(wrapper, 'slimscroll-wrapper');
        dom.setStyle(wrapper, 'position', 'relative');
        dom.setStyle(wrapper, 'overflow', 'hidden');
        dom.setStyle(wrapper, 'display', 'block');
        dom.setStyle(wrapper, 'margin', dom.getComputedStyle(el).margin);
        dom.setStyle(wrapper, 'width', dom.getComputedStyle(el).width);
        dom.setStyle(wrapper, 'height', dom.getComputedStyle(el).height);
        dom.setStyle(el, 'margin', '0');
        el.parentNode.insertBefore(wrapper, el);
        wrapper.appendChild(el);
    };
    SlimScroll.prototype.initBar = function () {
        this.bar = this.dom.createElement('div');
        var dom = this.dom;
        var bar = this.bar;
        var el = this.el;
        dom.addClass(bar, 'slimscroll-bar');
        dom.setStyle(bar, 'position', 'absolute');
        dom.setStyle(bar, 'top', '0');
        dom.setStyle(bar, this.position, this.borderRadius);
        dom.setStyle(bar, 'width', this.width);
        dom.setStyle(bar, 'background', this.background);
        dom.setStyle(bar, 'opacity', this.opacity);
        dom.setStyle(bar, 'display', 'block');
        dom.setStyle(bar, 'cursor', 'pointer');
        dom.setStyle(bar, 'z-index', '99');
        dom.setStyle(bar, 'border-radius', '3px');
        el.appendChild(bar);
    };
    SlimScroll.prototype.getBarHeight = function () {
        var barHeight = Math.max((this.el.offsetHeight / this.el.scrollHeight) * this.el.offsetHeight, 30) + 'px';
        var display = barHeight === this.el.offsetHeight ? 'none' : 'block';
        this.dom.setStyle(this.bar, 'height', barHeight);
        this.dom.setStyle(this.bar, 'display', display);
    };
    SlimScroll.prototype.attachWheel = function (target) {
        target.addEventListener('DOMMouseScroll', this.onWheel, false);
        target.addEventListener('mousewheel', this.onWheel, false);
    };
    SlimScroll.prototype.scrollContent = function (y, isWheel, isJump) {
        var delta = y;
        var maxTop = this.el.offsetHeight - this.bar.offsetHeight;
        var percentScroll;
        var barTop;
        var dom = this.dom;
        var bar = this.bar;
        var el = this.el;
        if (isWheel) {
            delta = parseInt(dom.getStyle(bar, 'top'), 10) + y * 20 / 100 * bar.offsetHeight;
            delta = Math.min(Math.max(delta, 0), maxTop);
            delta = (y > 0) ? Math.ceil(delta) : Math.floor(delta);
            dom.setStyle(bar, 'top', delta + 'px');
        }
        percentScroll = parseInt(dom.getStyle(bar, 'top'), 10) / (el.offsetHeight - bar.offsetHeight);
        delta = percentScroll * (el.scrollHeight - el.offsetHeight);
        el.scrollTop = delta;
    };
    SlimScroll.prototype.destroy = function () {
        if (this.dom.hasClass(this.el.parentElement, 'slimscroll-wrapper')) {
            var wrapper = this.el.parentElement;
            var bar = this.dom.getElementsByClassName(this.el, 'slimscroll-bar')[0];
            this.dom.removeChild(this.el, bar);
            this.unwrap(wrapper);
        }
    };
    SlimScroll.prototype.unwrap = function (wrapper) {
        var docFrag = document.createDocumentFragment();
        while (wrapper.firstChild) {
            var child = wrapper.removeChild(wrapper.firstChild);
            docFrag.appendChild(child);
        }
        wrapper.parentNode.replaceChild(docFrag, wrapper);
    };
    SlimScroll.prototype.init = function () {
        this.destroy();
        this.setElementStyle();
        this.wrapContainer();
        this.initBar();
        this.getBarHeight();
        this.attachWheel(this.el);
        this.makeBarDraggable();
    };
    SlimScroll = __decorate([
        core_1.Directive({
            selector: '[slimscroll]'
        }), 
        __metadata('design:paramtypes', [core_1.ViewContainerRef])
    ], SlimScroll);
    return SlimScroll;
})();
exports.SlimScroll = SlimScroll;
//# sourceMappingURL=slimscroll.directive.js.map