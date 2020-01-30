import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';
import { StocksComponent } from './stocks.component';
import { SharedUiChartModule } from '@coding-challenge/shared/ui/chart';
import { StoreModule } from '@ngrx/store';
import { NoopAnimationsModule } from '@angular/platform-browser/animations/';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { of } from 'rxjs';

describe('StocksComponent', () => {
  let component: StocksComponent;
  let fixture: ComponentFixture<StocksComponent>;
  let priceQueryFacade: PriceQueryFacade;
  const MockPriceQueryFacade = {
    fetchQuote: jest.fn()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        SharedUiChartModule,
        StoreModule.forRoot({}),
        NoopAnimationsModule,
        MatDatepickerModule,
        MatNativeDateModule
      ],
      declarations: [StocksComponent],
      providers: [
        {
          provide: PriceQueryFacade,
          useValue: MockPriceQueryFacade
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksComponent);
    component = fixture.componentInstance;
    priceQueryFacade = fixture.debugElement.injector.get(PriceQueryFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('fetchQuote', () => {
    it('should fetch chart data', () => {
      spyOn((component as any).priceQuery, 'fetchQuote').and.returnValue(
        of({})
      );
      const date = new Date();
      component.stockPickerForm.controls['symbol'].setValue('AAPL');
      component.stockPickerForm.controls['startDate'].setValue(date);
      component.stockPickerForm.controls['endDate'].setValue(date);
      component.fetchQuote();
      expect(priceQueryFacade.fetchQuote).toBeCalledTimes(1);
      expect(priceQueryFacade.fetchQuote).toHaveBeenCalledWith(
        'AAPL',
        date,
        date
      );
    });
  });
  describe('validateStartEndDate', () => {
    it('should validate date', () => {
      const today = new Date();
      const nextday = today.setDate(today.getDate() + 1);
      component.endDateModel = new Date();
      component.startDateModel = new Date(nextday);
      component.validateStartEndDate();
      expect(component.endDateModel).toEqual(component.startDateModel);
    });
  });
});
