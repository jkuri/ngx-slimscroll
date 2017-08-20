import {
  inject,
  async,
  TestBed,
  ComponentFixture
} from '@angular/core/testing';
import { AppHomeComponent } from './app-home.component';
import { NgSlimScrollModule } from '../../ngx-slimscroll/module/ngx-slimscroll.module';

describe(`App`, () => {
  let comp: AppHomeComponent;
  let fixture: ComponentFixture<AppHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppHomeComponent ],
      imports: [ NgSlimScrollModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppHomeComponent);
    comp    = fixture.componentInstance;

    fixture.detectChanges();
  });

  it(`should be readly initialized`, () => {
    expect(fixture).toBeDefined();
    expect(comp).toBeDefined();
  });
});
