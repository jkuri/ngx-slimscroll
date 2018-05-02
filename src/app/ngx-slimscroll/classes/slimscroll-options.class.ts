import { ISlimScrollOptions } from './slimscroll-options.class';
import { ISlimScrollEvent } from './slimscroll-event.class';
import { InjectionToken } from '@angular/core';

export interface ISlimScrollOptions {
  position?: string;
  barBackground?: string;
  barOpacity?: string;
  barWidth?: string;
  barBorderRadius?: string;
  barMargin?: string;
  gridBackground?: string;
  gridOpacity?: string;
  gridWidth?: string;
  gridBorderRadius?: string;
  gridMargin?: string;
  alwaysVisible?: boolean;
  visibleTimeout?: number;
}

export const SLIMSCROLL_DEFAULTS: InjectionToken<ISlimScrollOptions>
    = new InjectionToken('NGX_SLIMSCROLL_DEFAULTS');

export class SlimScrollOptions implements ISlimScrollOptions {
  position?: string;
  barBackground?: string;
  barOpacity?: string;
  barWidth?: string;
  barBorderRadius?: string;
  barMargin?: string;
  gridBackground?: string;
  gridOpacity?: string;
  gridWidth?: string;
  gridBorderRadius?: string;
  gridMargin?: string;
  alwaysVisible?: boolean;
  visibleTimeout?: number;

  constructor(obj?: ISlimScrollOptions) {
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
    this.alwaysVisible = obj && typeof obj.alwaysVisible !== 'undefined' ? obj.alwaysVisible : true;
    this.visibleTimeout = obj && obj.visibleTimeout ? obj.visibleTimeout : 1000;
  }

  public merge(obj?: ISlimScrollOptions): SlimScrollOptions {
    const result = new SlimScrollOptions();

    result.position = obj && obj.position ? obj.position : this.position;
    result.barBackground = obj && obj.barBackground ? obj.barBackground : this.barBackground;
    result.barOpacity = obj && obj.barOpacity ? obj.barOpacity : this.barOpacity;
    result.barWidth = obj && obj.barWidth ? obj.barWidth : this.barWidth;
    result.barBorderRadius = obj && obj.barBorderRadius ? obj.barBorderRadius : this.barBorderRadius;
    result.barMargin = obj && obj.barMargin ? obj.barMargin : this.barMargin;
    result.gridBackground = obj && obj.gridBackground ? obj.gridBackground : this.gridBackground;
    result.gridOpacity = obj && obj.gridOpacity ? obj.gridOpacity : this.gridBackground;
    result.gridWidth = obj && obj.gridWidth ? obj.gridWidth : this.gridWidth;
    result.gridBorderRadius = obj && obj.gridBorderRadius ? obj.gridBorderRadius : this.gridBorderRadius;
    result.gridMargin = obj && obj.gridMargin ? obj.gridMargin : this.gridMargin;
    result.alwaysVisible = obj && typeof obj.alwaysVisible !== 'undefined' ? obj.alwaysVisible : this.alwaysVisible;
    result.visibleTimeout = obj && obj.visibleTimeout ? obj.visibleTimeout : this.visibleTimeout;

    return result;
  }
}
