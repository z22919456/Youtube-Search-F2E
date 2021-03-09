import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { selectPage, goNextPage, search } from './features/searcherSlice';

function App() {
  const [keyword, setKeyword] = useState('');
  const dispatch = useDispatch();
  const { currentPage, pageTokenList } = useSelector(selectPage);
  console.log(currentPage);
  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
  };
  const handleSearchBtnClick = () => {
    dispatch(search(keyword));
  };
  const handleNextBtnClick = (e) => {
    const page = parseInt(e.target.value, 10);
    console.log(page);
    dispatch(goNextPage(page));
  };
  return (
    <div className="App">
      <h1>hellow word</h1>
      <input type="text" onChange={handleSearchChange} value={keyword} />
      <button onClick={handleSearchBtnClick} type="button">送出</button>
      {console.log(pageTokenList.length)}
      {pageTokenList.map((pageToken, i) => (
        <>
          { console.log('index:', i)}
          <button type="button" value={i + 1} key={pageToken} onClick={handleNextBtnClick}>
            {' '}
            {i + 1}
          </button>
        </>
      ))}
      <button value={pageTokenList.length} onClick={handleNextBtnClick} type="button">Next</button>
    </div>
  );
}

export default App;
