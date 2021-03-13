export const selectPage = ({ searcher }) => ({
  currentPageNum: searcher.currentPageNum,
  totalPage: searcher.totalPage,
  totalResults: searcher.totalResults,
});

export const selectKeywrod = ({ searcher }) => searcher.keyword;

export const selectItems = ({ searcher }) => ({
  items: searcher.items,
  loading: searcher.loading,
});

export const selectQuery = ({ searcher }) => ({
  keyword: searcher.keyword,
  page: searcher.currentPageNum,
});

export const selectInfo = ({ searcher }) => ({
  keyword: searcher.keyword,
  totalResults: searcher.totalResults,
});
