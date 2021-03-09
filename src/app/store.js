import { configureStore } from '@reduxjs/toolkit';
import searcherReducer from '../features/searcherSlice';

export default configureStore({
  reducer: {
    searcher: searcherReducer,
  },
});
