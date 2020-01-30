import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule } from '@angular/material';
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
    error$: of({
      value: 'error'
    }),
    fetchQuote: jest.fn(),
    loadSymbol: jest.fn()
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule,
      MatInputModule, MatSelectModule, MatButtonModule, SharedUiChartModule, StoreModule.forRoot({}), NoopAnimationsModule],
      declarations: [ StocksComponent ],
      providers: [
        {
          provide: PriceQueryFacade,
          useValue: MockPriceQueryFacade
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    priceQueryFacade = fixture.debugElement.injector.get(PriceQueryFacade);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('fetchQuote', () => {
    it('should fetch chart data', () => {
      spyOn((component as any).priceQuery, 'fetchQuote').and.returnValue(of({}));
      component.stockPickerForm.controls['symbol'].setValue('AAPL');
      component.stockPickerForm.controls['period'].setValue('max');
      component.fetchQuote();
      expect(priceQueryFacade.fetchQuote).toBeCalledTimes(1);
      expect(priceQueryFacade.fetchQuote).toHaveBeenCalledWith('AAPL', 'max');
    })
  })
});
