import {
  inject,
  async,
  fakeAsync,
  tick,
  TestBed,
  ComponentFixture,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AppHomeComponent } from './app-home.component';
import { SlimScrollDirective } from '../../ngx-slimscroll/directives/slimscroll.directive';

describe(`Slimscroll Directive`, () => {
  let comp: AppHomeComponent;
  let fixture: ComponentFixture<AppHomeComponent>;
  let de: DebugElement;
  let dir: SlimScrollDirective;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppHomeComponent, SlimScrollDirective ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppHomeComponent);
    fixture.detectChanges();
    comp = fixture.componentInstance;
    const des = fixture.debugElement.queryAll(By.directive(SlimScrollDirective));
    de = des[0];
    dir = de.injector.get(SlimScrollDirective) as SlimScrollDirective;
    fixture.detectChanges();
  });

  it(`should initialized itself`, () => {
    expect(fixture).toBeDefined();
    expect(comp).toBeDefined();
  });

  it(`should wrap main element inside '.slimscroll-wrapper'`, () => {
    const wrapper = de.parent.query(By.css('.slimscroll-wrapper'));
    expect(wrapper).toBeTruthy();
    expect(wrapper.nativeElement.contains(de.nativeElement)).toBeTruthy();
  });

  it(`should apply correct styles on '.slimscroll-wrapper'`, () => {
    const wrapper = de.parent.query(By.css('.slimscroll-wrapper'));
    expect(wrapper.styles.position).toBe('relative');
    expect(wrapper.styles.overflow).toBe('hidden');
    expect(wrapper.styles.display).toBe('inline-block');
    expect(wrapper.styles.margin).toBe(getComputedStyle(de.nativeElement).margin);
    expect(wrapper.styles.width).toBe('100%');
  });

  it(`should initialize '.slimscroll-grid'`, () => {
    const grid = de.query(By.css('.slimscroll-grid'));
    expect(grid).toBeTruthy();
  });

  it(`should apply correct styles on '.slimscroll-grid'`, () => {
    const grid = de.query(By.css('.slimscroll-grid'));
    expect(grid.styles.position).toBe('absolute');
    expect(grid.styles.top).toBe('0');
    expect(grid.styles.bottom).toBe('0');
    expect(grid.styles.right).toBe('0');
    expect(grid.styles.width).toBe(comp.options.gridWidth + 'px');
    expect(grid.styles.background).toBe(comp.options.gridBackground);
    expect(grid.styles.opacity).toBe(dir.options.gridOpacity);
    expect(grid.styles.display).toBe('block');
    expect(grid.styles.cursor).toBe('pointer');
    expect(grid.styles['z-index']).toBe('99');
    expect(grid.styles['border-radius']).toBe(dir.options.gridBorderRadius + 'px');
    expect(grid.styles.margin).toBe(dir.options.gridMargin);
  });

  it(`should initialize '.slimscroll-bar'`, () => {
    const bar = de.query(By.css('.slimscroll-bar'));
    expect(bar).toBeTruthy();
  });

  it(`should initialize correct styles on '.slimscroll-bar'`, () => {
    const bar = de.query(By.css('.slimscroll-bar'));
    expect(bar.styles.position).toBe('absolute');
    expect(bar.styles.top).toBe('0');
    expect(bar.styles.right).toBe('0');
    expect(bar.styles.width).toBe(dir.options.barWidth + 'px');
    expect(bar.styles.background).toBe(dir.options.barBackground);
    expect(bar.styles.opacity).toBe(dir.options.barOpacity);
    expect(bar.styles.display).toBe('block');
    expect(bar.styles.cursor).toBe('pointer');
    expect(bar.styles['z-index']).toBe('100');
    expect(bar.styles['border-radius']).toBe(dir.options.barBorderRadius + 'px');
    expect(bar.styles.margin).toBe(dir.options.barMargin);
  });

  it(`should set scroll bar style top on 'scrollContent' method`, fakeAsync(() => {
    const bar = de.query(By.css('.slimscroll-bar'));

    dir.scrollContent(10, true, false);
    fixture.detectChanges();
    expect(parseInt(bar.styles.top, 10)).toBeGreaterThan(0);
  }));

  it(`should set element scrollTop on 'scrollContent' method`, fakeAsync(() => {
    const el = de.parent.query(By.css('.slimscroll-wrapper > div'));

    dir.scrollContent(10, true, false);
    fixture.detectChanges();
    expect(parseInt(el.nativeElement.scrollTop, 10)).toBeGreaterThan(0);
  }));

  it(`should set scroll bar style top back to 0 on 'scrollContent' method`, fakeAsync(() => {
    const bar = de.query(By.css('.slimscroll-bar'));

    dir.scrollContent(10, true, false);
    fixture.detectChanges();
    dir.scrollContent(-10, true, false);
    fixture.detectChanges();
    expect(parseInt(bar.styles.top, 10)).toBe(0);
  }));

  it(`should set element scrollTop back on 0 on 'scrollContent' method`, fakeAsync(() => {
    const el = de.parent.query(By.css('.slimscroll-wrapper > div'));

    dir.scrollContent(10, true, false);
    fixture.detectChanges();
    dir.scrollContent(-10, true, false);
    fixture.detectChanges();
    expect(parseInt(el.nativeElement.scrollTop, 10)).toBe(0);
  }));
});
