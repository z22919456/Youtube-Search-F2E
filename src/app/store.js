import { configureStore } from '@reduxjs/toolkit';
import searcherReducer from '../features/searcherSlice';
import debounce from '../utils/debounce';
import { saveState } from '../utils/localStorage';

const store = configureStore({
  reducer: {
    searcher: searcherReducer,
  },
});

store.subscribe(debounce(() => {
  const state = store.getState();
  saveState({
    pageTokenList: state.searcher.pageTokenList,
    searchCache: state.searcher.searchCache,
    keyword: state.searcher.keyword,
  });
}));

export default store;
