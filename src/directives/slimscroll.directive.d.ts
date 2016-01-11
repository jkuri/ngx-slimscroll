import { ViewContainerRef } from 'angular2/core';
export declare class SlimScroll {
    private el;
    private wrapper;
    private bar;
    private viewContainer;
    private background;
    private opacity;
    private width;
    private position;
    private borderRadius;
    private dom;
    constructor(viewContainer: ViewContainerRef);
    private setElementStyle();
    private wrapContainer();
    private initBar();
    private getBarHeight();
    private attachWheel(target);
    private onWheel;
    private scrollContent(y, isWheel, isJump);
    private makeBarDraggable;
    private barDraggableListener;
    private destroy();
    private unwrap(wrapper);
    private init();
}
