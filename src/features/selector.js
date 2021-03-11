export const selectPage = ({ searcher }) => ({
  currentPageNum: searcher.currentPageNum,
  pageTokenList: searcher.pageTokenList,
});

export const selectKeywrod = ({ searcher }) => searcher.keyword;

export const selectItems = ({ searcher }) => searcher.items;

export const selectPageList = ({ searcher }) => searcher.pageTokenList;
