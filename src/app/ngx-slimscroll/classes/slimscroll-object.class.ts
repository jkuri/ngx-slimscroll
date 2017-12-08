import { Subscription } from 'rxjs/Subscription';
import { SlimScrollOptions } from './slimscroll-options.class';

export interface ISlimScrollObject {
    options?: SlimScrollOptions;
    el?: HTMLElement;
    wrapper?: HTMLElement;
    grid?: HTMLElement;
    body?: HTMLElement;
    bar?: HTMLElement;
    pageY?: number;
    top?: number;
    dragging?: boolean;
    mutationThrottleTimeout?: number;
    mutationObserver?: MutationObserver;
    lastTouchPositionY?: number;
    visibleTimeout?: any;
    interactionSubscriptions: Subscription;
}

export class SlimScrollObject implements ISlimScrollObject {
    options?: SlimScrollOptions;
    el?: HTMLElement;
    wrapper?: HTMLElement;
    grid?: HTMLElement;
    body?: HTMLElement;
    bar?: HTMLElement;
    pageY?: number;
    top?: number;
    dragging?: boolean;
    mutationThrottleTimeout?: number;
    mutationObserver?: MutationObserver;
    lastTouchPositionY?: number;
    visibleTimeout?: any;
    interactionSubscriptions: Subscription;

    constructor(el: HTMLElement) {
        this.el = el;
        this.interactionSubscriptions = new Subscription();
    }
}
