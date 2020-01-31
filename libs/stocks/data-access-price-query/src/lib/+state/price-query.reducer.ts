import { PriceQueryAction, PriceQueryActionTypes } from './price-query.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { PriceQuery, PriceQueryResponse } from './price-query.type';
import { transformPriceQueryResponse } from './price-query-transformer.util';

export const PRICEQUERY_FEATURE_KEY = 'priceQuery';

export interface PriceQueryState extends EntityState<PriceQuery> {
  selectedSymbol: string;
}

export function sortByDateNumeric(a: PriceQuery, b: PriceQuery): number {
  return a.dateNumeric - b.dateNumeric;
}

export const priceQueryAdapter: EntityAdapter<PriceQuery> = createEntityAdapter<
  PriceQuery
>({
  selectId: (priceQuery: PriceQuery) => priceQuery.dateNumeric,
  sortComparer: sortByDateNumeric
});

export interface PriceQueryPartialState {
  readonly [PRICEQUERY_FEATURE_KEY]: PriceQueryState;
}

export const initialState: PriceQueryState = priceQueryAdapter.getInitialState({
  selectedSymbol: ''
});

export function priceQueryReducer(
  state: PriceQueryState = initialState,
  action: PriceQueryAction
): PriceQueryState {
  switch (action.type) {
    case PriceQueryActionTypes.PriceQueryFetched: {
      action.queryResults = filterDataWithDates(
        action.queryResults,
        action.startDate,
        action.endDate
      );
      return priceQueryAdapter.addAll(
        transformPriceQueryResponse(action.queryResults),
        state
      );
    }
    case PriceQueryActionTypes.SelectSymbol: {
      return {
        ...state,
        selectedSymbol: action.symbol
      };
    }
  }
  return state;
}
function filterDataWithDates(
  queryResults: PriceQueryResponse[],
  startDate: string,
  endDate: string
) {
  return queryResults.filter((stockData: PriceQueryResponse) => {
    const stockDateCon = new Date(stockData.date);
    const startDateCon = new Date(startDate);
    const endDateCon = new Date(endDate);
    if (stockDateCon >= startDateCon && stockDateCon <= endDateCon) {
      return true;
    }
  });
}
