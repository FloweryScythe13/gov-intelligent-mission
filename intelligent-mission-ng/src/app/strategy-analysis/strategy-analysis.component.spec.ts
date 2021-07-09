import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategyAnalysisComponent } from './strategy-analysis.component';

describe('StrategyAnalysisComponent', () => {
  let component: StrategyAnalysisComponent;
  let fixture: ComponentFixture<StrategyAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrategyAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrategyAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
