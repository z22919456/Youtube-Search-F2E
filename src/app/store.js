import { configureStore } from '@reduxjs/toolkit';
import searcherReducer from '../features/searcherSlice';
import { saveState } from '../utils/localStorage';

const store = configureStore({
  reducer: {
    searcher: searcherReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  saveState({
    pageTokenList: state.searcher.pageTokenList,
    searchCache: state.searcher.searchCache,
  });
});

export default store;
