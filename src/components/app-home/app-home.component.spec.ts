import {
  inject,
  async,
  TestBed,
  ComponentFixture,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AppHomeComponent } from './app-home.component';
import { SlimScrollDirective } from '../../ngx-slimscroll/directives/slimscroll.directive';

describe(`App`, () => {
  let comp: AppHomeComponent;
  let fixture: ComponentFixture<AppHomeComponent>;
  let des: DebugElement[];

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ AppHomeComponent, SlimScrollDirective ]
    })
    .createComponent(AppHomeComponent);

    fixture.detectChanges();
    comp = fixture.componentInstance;
    des = fixture.debugElement.queryAll(By.directive(SlimScrollDirective));
  });

  it(`should initialized itself`, () => {
    expect(fixture).toBeDefined();
    expect(comp).toBeDefined();
  });

  it(`should have two slimscroll directives applied`, () => {
    expect(des.length).toBe(2);
  });

});
