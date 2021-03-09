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
    searchByKeyword: (state, { payload }) => {
      const { keyword, nextPageToken, items } = payload;
      state.keyword = keyword;
      state.nextPageToken = nextPageToken;
      state.items = items;
      state.currentPageNum = 1;
      state.pageTokenList[0] = '';
      state.pageTokenList[1] = nextPageToken;
      state.loading = false;
    },
    changePage: (state, { payload }) => {
      const {
        nextPageToken, items, currentPageNum,
      } = payload;
      state.nextPageToken = nextPageToken;
      state.items = items;
      state.currentPageNum = currentPageNum;
      state.loading = false;
      state.pageTokenList[currentPageNum] = nextPageToken;
    },
    cacheRestore: (state, { payload }) => ({ ...state, ...payload }),
    cacheStore: (state, { payload }) => {
      const { keyword, currentPageToken } = payload;
      state.searchCache[hashCode(`${keyword}${currentPageToken}`)] = payload;
    },
  },
});

const {
  cacheStore, changePage, searchByKeyword, loading, cacheRestore,
} = searcherSlice.actions;

// search with keyword
export const search = (keyword) => (dispatch, getState) => {
  const { searcher } = getState();

  // check cache
  const cache = searcher.searchCache[hashCode(keyword)];
  if (cache) {
    dispatch(cacheRestore(cache));
    return;
  }

  // fetchData
  dispatch(loading());
  fetchData(keyword)
    .then(({ items, nextPageToken }) => {
      dispatch(searchByKeyword({ keyword, items, nextPageToken }));
      dispatch(cacheStore({
        keyword, items, nextPageToken, currentPageNum: 1, currentPageToken: '',
      }));
    });
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
  dispatch(loading());
  fetchData(keyword, pageToken)
    .then(({ items, nextPageToken }) => {
      dispatch(changePage({
        nextPageToken, items, currentPageNum: page, currentPageToken: pageToken,
      }));
      dispatch(cacheStore({
        keyword, items, nextPageToken, currentPageNum: page, currentPageToken: pageToken,
      }));
    });
};

export const selectPage = ({ searcher }) => ({
  currentPageNum: searcher.currentPageNum,
  pageTokenList: searcher.pageTokenList,
});

export default searcherSlice.reducer;
