# Youtube Search F2E

使用 `Google Api v3` 實作搜尋頁面

## 使用方式

1. 請至`.evn`新增 `API Access key`
2. `yarn install`
3. `yarn start`
4. 也可到 [我的firebase hosting](https://searchf2e.web.app/) 直接使用

## 主要解決的問題

1. 沒有頁數紀錄（該api應該是給使用無限滾動用的，因此沒有紀錄當前頁數）
   > 解決方式：
   > 紀錄每一頁的 `nextPageToken` (放進快取) 作為 Pagination 使用
2. 點選影片後返回上一頁會刷新
   > 解決方式：
   > 使用 `LocalStorage` 快取，並導入 `React route dom` 透過Query String 紀錄當前搜尋的關鍵字與頁數
3. 快取方式
   > 每個keyword儲存10頁，共儲存10個keyword。 依照 timestamp FIFO
## 使用的Libary

* Material Ui
* Styled Components
* Redux toolkit
* Moment.js
* qs
* React Router Dom

