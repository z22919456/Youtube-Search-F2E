export const selectPage = ({ searcher }) => ({
  currentPageNum: searcher.currentPageNum,
  pageTokenList: searcher.pageTokenList,
});

export const selectKeywrod = ({ searcher }) => searcher.keyword;
