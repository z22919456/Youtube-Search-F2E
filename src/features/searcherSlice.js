/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import fetchData from '../api';
import hashCode from '../utils/hashCode';

export const searcherSlice = createSlice({
  name: 'searcher',
  initialState: {
    keyword: '',
    loading: true,
    nextPageToken: '',
    items: [],
    currentPageNum: 1,
    currentPageToken: '',
    pageTokenList: [],
    searchCache: {},
  },
  reducers: {
    loading: (state) => {
      state.loading = true;
    },
    loadPage: (state, { payload }) => {
      const {
        keyword, nextPageToken, items, currentPageNum, currentPageToken,
      } = payload;
      const currentPage = currentPageNum < 1 ? 0 : currentPageNum;
      state.loading = false;
      state.keyword = keyword;
      state.nextPageToken = nextPageToken;
      state.items = items;
      state.currentPageNum = currentPage;
      state.pageTokenList[currentPage - 1] = currentPageToken || '';
      if (nextPageToken) state.pageTokenList[currentPage] = nextPageToken;
    },
    cleanPageToken: (state) => { state.pageTokenList = []; },
    cacheRestore: (state, { payload }) => ({ ...state, ...payload }),
    cacheStore: (state, { payload }) => {
      const { keyword, currentPageToken } = payload;
      state.searchCache[hashCode(`${keyword}${currentPageToken}`)] = payload;
    },
    restoreState: (state, { payload }) => {
      state.pageTokenList = payload.pageTokenList || [];
      state.searchCache = payload.searchCache || {};
    },
  },
});

export const {
  cacheStore, loadPage, loading, cacheRestore, restoreState, cleanPageToken,
} = searcherSlice.actions;

const fetchPage = ((keyword, pageToken = '', page = 1) => (dispatch) => {
  dispatch(loading());
  if (page === 1) {
    dispatch(cleanPageToken());
  }
  fetchData(keyword, pageToken)
    .then(({ items, nextPageToken }) => {
      dispatch(loadPage({
        keyword,
        nextPageToken,
        items,
        currentPageNum: page,
        currentPageToken: pageToken,
      }));
      dispatch(cacheStore({
        keyword, items, nextPageToken, currentPageNum: page, currentPageToken: pageToken,
      }));
    });
});

// search with keyword
export const search = (keyword) => (dispatch, getState) => {
  const { searcher } = getState();

  // check cache
  const cache = searcher.searchCache[hashCode(keyword)];
  if (cache) {
    dispatch(cacheRestore(cache));
    return;
  }
  dispatch(fetchPage(keyword));
};

// switch page
export const goNextPage = (page) => (dispatch, getState) => {
  const { keyword, searchCache, pageTokenList } = getState().searcher;
  const pageToken = pageTokenList[page - 1];

  // check cache
  const cache = searchCache[hashCode(`${keyword}${pageToken}`)];
  if (cache) {
    dispatch(cacheRestore(cache));
    return;
  }

  // fetchData
  dispatch(fetchPage(keyword, page, pageToken));
};

// restore page when leave
export const restorePageByQueryString = (queryString) => (dispatch, getState) => {
  const { keyword, page } = queryString;
  const { pageTokenList, searchCache } = getState().searcher;

  // check cache
  const cache = searchCache[hashCode(`${keyword}${pageTokenList[page - 1]}`)];
  if (cache) {
    dispatch(cacheRestore(cache));
    return;
  }

  dispatch(fetchPage(keyword));
};

export default searcherSlice.reducer;
