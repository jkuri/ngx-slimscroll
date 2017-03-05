(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core'], factory) :
	(factory((global['ng2-slimscroll'] = global['ng2-slimscroll'] || {}),global.vendor._angular_core));
}(this, (function (exports,_angular_core) { 'use strict';

var SlimScrollOptions = (function () {
    function SlimScrollOptions(obj) {
        this.position = obj && obj.position ? obj.position : 'right';
        this.barBackground = obj && obj.barBackground ? obj.barBackground : '#343a40';
        this.barOpacity = obj && obj.barOpacity ? obj.barOpacity : '1';
        this.barWidth = obj && obj.barWidth ? obj.barWidth : '12';
        this.barBorderRadius = obj && obj.barBorderRadius ? obj.barBorderRadius : '5';
        this.barMargin = obj && obj.barMargin ? obj.barMargin : '1px 0';
        this.gridBackground = obj && obj.gridBackground ? obj.gridBackground : '#adb5bd';
        this.gridOpacity = obj && obj.gridOpacity ? obj.gridOpacity : '1';
        this.gridWidth = obj && obj.gridWidth ? obj.gridWidth : '8';
        this.gridBorderRadius = obj && obj.gridBorderRadius ? obj.gridBorderRadius : '10';
        this.gridMargin = obj && obj.gridMargin ? obj.gridMargin : '1px 2px';
    }
    return SlimScrollOptions;
}());

var __decorate$1 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { r = Reflect.decorate(decorators, target, key, desc); }
    else { for (var i = decorators.length - 1; i >= 0; i--) { if (d = decorators[i]) { r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r; } } }
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") { return Reflect.metadata(k, v); }
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var SlimScrollDirective = (function () {
    function SlimScrollDirective(viewContainer, renderer) {
        var _this = this;
        this.viewContainer = viewContainer;
        this.renderer = renderer;
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
            bar.addEventListener('mousedown', function (e) {
                if (!_this.dragging) {
                    _this.pageY = e.pageY;
                    _this.top = parseFloat(getComputedStyle(_this.bar).top);
                }
                _this.dragging = true;
                _this.body.addEventListener('mousemove', _this.barDraggableListener, false);
                _this.body.addEventListener('selectstart', _this.preventDefaultEvent, false);
            }, false);
            _this.body.addEventListener('mouseup', function () {
                _this.body.removeEventListener('mousemove', _this.barDraggableListener, false);
                _this.body.removeEventListener('selectstart', _this.preventDefaultEvent, false);
                _this.dragging = false;
            }, false);
        };
        this.preventDefaultEvent = function (e) {
            e.preventDefault();
            e.stopPropagation();
        };
        this.barDraggableListener = function (e) {
            var top = _this.top + e.pageY - _this.pageY;
            _this.renderer.setElementStyle(_this.bar, 'top', top + "px");
            _this.scrollContent(0, true, false);
        };
        if (typeof window === 'undefined') {
            return;
        }
        this.viewContainer = viewContainer;
        this.el = viewContainer.element.nativeElement;
        this.body = document.documentElement.querySelector('body');
        this.mutationThrottleTimeout = 50;
    }
    SlimScrollDirective.prototype.ngOnInit = function () {
        var _this = this;
        if (typeof window === 'undefined') {
            return;
        }
        this.options = new SlimScrollOptions(this.options);
        this.destroy();
        this.setElementStyle();
        this.wrapContainer();
        this.initGrid();
        this.initBar();
        this.getBarHeight();
        this.attachWheel(this.el);
        this.makeBarDraggable();
        if (MutationObserver) {
            this.mutationObserver = new MutationObserver(function () {
                if (_this.mutationThrottleTimeout) {
                    clearTimeout(_this.mutationThrottleTimeout);
                    _this.mutationThrottleTimeout = setTimeout(_this.onMutation.bind(_this), 50);
                }
            });
            this.mutationObserver.observe(this.el, { subtree: true, childList: true });
        }
    };
    SlimScrollDirective.prototype.setElementStyle = function () {
        var el = this.el;
        this.renderer.setElementStyle(el, 'overflow', 'hidden');
        this.renderer.setElementStyle(el, 'position', 'relative');
        this.renderer.setElementStyle(el, 'display', 'block');
    };
    SlimScrollDirective.prototype.onMutation = function () {
        this.getBarHeight();
    };
    SlimScrollDirective.prototype.wrapContainer = function () {
        this.wrapper = document.createElement('div');
        var wrapper = this.wrapper;
        var el = this.el;
        this.renderer.setElementClass(wrapper, 'slimscroll-wrapper', true);
        this.renderer.setElementStyle(wrapper, 'position', 'relative');
        this.renderer.setElementStyle(wrapper, 'overflow', 'hidden');
        this.renderer.setElementStyle(wrapper, 'display', 'block');
        this.renderer.setElementStyle(wrapper, 'margin', getComputedStyle(el).margin);
        this.renderer.setElementStyle(wrapper, 'width', getComputedStyle(el).width);
        this.renderer.setElementStyle(wrapper, 'height', getComputedStyle(el).height);
        el.parentNode.insertBefore(wrapper, el);
        wrapper.appendChild(el);
    };
    SlimScrollDirective.prototype.initGrid = function () {
        this.grid = document.createElement('div');
        var grid = this.grid;
        this.renderer.setElementClass(grid, 'slimscroll-grid', true);
        this.renderer.setElementStyle(grid, 'position', 'absolute');
        this.renderer.setElementStyle(grid, 'top', '0');
        this.renderer.setElementStyle(grid, this.options.position, '0');
        this.renderer.setElementStyle(grid, 'width', this.options.gridWidth + "px");
        this.renderer.setElementStyle(grid, 'height', '100%');
        this.renderer.setElementStyle(grid, 'background', this.options.gridBackground);
        this.renderer.setElementStyle(grid, 'opacity', this.options.gridOpacity);
        this.renderer.setElementStyle(grid, 'display', 'block');
        this.renderer.setElementStyle(grid, 'cursor', 'pointer');
        this.renderer.setElementStyle(grid, 'z-index', '99');
        this.renderer.setElementStyle(grid, 'border-radius', this.options.gridBorderRadius + "px");
        this.renderer.setElementStyle(grid, 'margin', this.options.gridMargin);
        this.wrapper.appendChild(grid);
    };
    SlimScrollDirective.prototype.initBar = function () {
        this.bar = document.createElement('div');
        var bar = this.bar;
        var el = this.el;
        this.renderer.setElementClass(bar, 'slimscroll-bar', true);
        this.renderer.setElementStyle(bar, 'position', 'absolute');
        this.renderer.setElementStyle(bar, 'top', '0');
        this.renderer.setElementStyle(bar, this.options.position, '0');
        this.renderer.setElementStyle(bar, 'width', this.options.barWidth + "px");
        this.renderer.setElementStyle(bar, 'background', this.options.barBackground);
        this.renderer.setElementStyle(bar, 'opacity', this.options.barOpacity);
        this.renderer.setElementStyle(bar, 'display', 'block');
        this.renderer.setElementStyle(bar, 'cursor', 'pointer');
        this.renderer.setElementStyle(bar, 'z-index', '100');
        this.renderer.setElementStyle(bar, 'border-radius', this.options.barBorderRadius + "px");
        this.renderer.setElementStyle(bar, 'margin', this.options.barMargin);
        this.wrapper.appendChild(bar);
    };
    SlimScrollDirective.prototype.getBarHeight = function () {
        var _this = this;
        setTimeout(function () {
            var barHeight = Math.max((_this.el.offsetHeight / _this.el.scrollHeight) * _this.el.offsetHeight, 30) + 'px';
            var display = parseInt(barHeight, 10) === _this.el.offsetHeight ? 'none' : 'block';
            _this.renderer.setElementStyle(_this.bar, 'height', barHeight);
            _this.renderer.setElementStyle(_this.bar, 'display', display);
        }, 1);
    };
    SlimScrollDirective.prototype.attachWheel = function (target) {
        target.addEventListener('DOMMouseScroll', this.onWheel, false);
        target.addEventListener('mousewheel', this.onWheel, false);
    };
    SlimScrollDirective.prototype.scrollContent = function (y, isWheel, isJump) {
        var delta = y;
        var maxTop = this.el.offsetHeight - this.bar.offsetHeight;
        var percentScroll;
        var barTop;
        var bar = this.bar;
        var el = this.el;
        if (isWheel) {
            delta = parseInt(getComputedStyle(bar).top, 10) + y * 20 / 100 * bar.offsetHeight;
            delta = Math.min(Math.max(delta, 0), maxTop);
            delta = (y > 0) ? Math.ceil(delta) : Math.floor(delta);
            this.renderer.setElementStyle(bar, 'top', delta + 'px');
        }
        percentScroll = parseInt(getComputedStyle(bar).top, 10) / (el.offsetHeight - bar.offsetHeight);
        delta = percentScroll * (el.scrollHeight - el.offsetHeight);
        el.scrollTop = delta;
    };
    SlimScrollDirective.prototype.destroy = function () {
        if (this.mutationObserver) {
            this.mutationObserver.disconnect();
            this.mutationObserver = null;
        }
        if (this.el.parentElement.classList.contains('slimscroll-wrapper')) {
            var wrapper = this.el.parentElement;
            var bar = this.el.querySelector('.slimscroll-bar');
            this.el.removeChild(bar);
            this.unwrap(wrapper);
        }
    };
    SlimScrollDirective.prototype.unwrap = function (wrapper) {
        var docFrag = document.createDocumentFragment();
        while (wrapper.firstChild) {
            var child = wrapper.removeChild(wrapper.firstChild);
            docFrag.appendChild(child);
        }
        wrapper.parentNode.replaceChild(docFrag, wrapper);
    };
    return SlimScrollDirective;
}());
__decorate$1([
    _angular_core.Input(),
    __metadata("design:type", SlimScrollOptions)
], SlimScrollDirective.prototype, "options", void 0);
SlimScrollDirective = __decorate$1([
    _angular_core.Directive({
        selector: '[slimScroll]'
    }),
    __param(0, _angular_core.Inject(_angular_core.ViewContainerRef)),
    __param(1, _angular_core.Inject(_angular_core.Renderer)),
    __metadata("design:paramtypes", [_angular_core.ViewContainerRef,
        _angular_core.Renderer])
], SlimScrollDirective);

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { r = Reflect.decorate(decorators, target, key, desc); }
    else { for (var i = decorators.length - 1; i >= 0; i--) { if (d = decorators[i]) { r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r; } } }
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.SlimScrollModule = (function () {
    function SlimScrollModule() {
    }
    return SlimScrollModule;
}());
exports.SlimScrollModule = __decorate([
    _angular_core.NgModule({
        declarations: [
            SlimScrollDirective
        ],
        exports: [
            SlimScrollDirective
        ]
    })
], exports.SlimScrollModule);

exports.SlimScrollOptions = SlimScrollOptions;

Object.defineProperty(exports, '__esModule', { value: true });

})));
