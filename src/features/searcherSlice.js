/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import fetchData from '../api';
import cacheRecycle from '../utils/cacheRecycle';

export const searcherSlice = createSlice({
  name: 'searcher',
  initialState: {
    keyword: '',
    totalResults: 0,
    loading: false,
    nextPageToken: '',
    items: [],
    currentPageNum: 1,
    totalPage: 0,
    searchCache: {},
  },
  reducers: {
    loading: (state) => {
      state.loading = true;
    },
    loadPage: (state, { payload }) => ({ ...state, ...payload, loading: false }),
    cacheRestore: (state, { payload }) => ({ ...state, ...payload }),
    cacheStore: (state, { payload }) => {
      const { keyword, currentPageNum, timestamp } = payload;
      state.searchCache = cacheRecycle(state.searchCache, 5);
      if (!state.searchCache[keyword]) {
        state.searchCache[keyword] = {};
      }
      state.searchCache[keyword].timestamp = timestamp;
      state.searchCache[keyword].page[currentPageNum - 1] = payload;
    },
    restoreStateFormLocalStorage: (state, { payload }) => {
      state.searchCache = payload.searchCache || {};
    },
  },
});

export const {
  cacheStore, loadPage, loading, cacheRestore, restoreStateFormLocalStorage,
} = searcherSlice.actions;

// fetch Data
const fetchPage = ((keyword, pageToken = '', page = 1) => (dispatch) => {
  dispatch(loading());
  fetchData(keyword, pageToken)
    .then(({ items, nextPageToken, pageInfo }) => {
      const state = {
        keyword,
        nextPageToken,
        items,
        totalResults: pageInfo.totalResults,
        currentPageNum: page,
        totalPage: nextPageToken ? page + 1 : page,
      };
      dispatch(loadPage(state));
      console.log(Date.now().toString());
      dispatch(cacheStore({ ...state, timestamp: Date.now().toString() }));
    })
    .catch((err) => console.log(err));
});

// get cache by keywor and token
const tryGetCache = (getState, keyword, pageNum = 1) => {
  if (!keyword) return null;
  const { searcher } = getState();
  return searcher.searchCache[keyword]?.page[pageNum - 1];
};

// search with keyword
export const search = (keyword) => (dispatch, getState) => {
  // check cache
  const cache = tryGetCache(getState, keyword);
  if (cache) {
    dispatch(cacheRestore(cache)); return;
  }
  dispatch(fetchPage(keyword));
};

// switch page
export const goNextPage = (page) => (dispatch, getState) => {
  const { keyword, nextPageToken } = getState().searcher;

  // check cache
  const cache = tryGetCache(getState, keyword, page);
  if (cache) {
    dispatch(cacheRestore(cache)); return;
  }

  dispatch(fetchPage(keyword, nextPageToken, page));
};

// restore page when reflash
export const restorePageByQueryString = (queryString) => (dispatch, getState) => {
  const { keyword, page } = queryString;

  // check cache
  const cache = tryGetCache(getState, keyword, page);
  if (cache) {
    dispatch(cacheRestore(cache)); return;
  }

  dispatch(fetchPage(keyword));
};

export default searcherSlice.reducer;
