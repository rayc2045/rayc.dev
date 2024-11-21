# rayc.dev｜不依賴套件和框架的作品集網站

![cover](/assets/images/cover.png)

[rayc.dev](https://rayc.dev)

### 專案簡介

我始終認為，設計與開發是一體兩面，設計本是為開發而存在，開發也是為了完成設計，兩者相輔相成、互相影響，因此在網站主頁使用了聖保羅教堂的去背圖與對設計和開發的詮釋，表現自己在前端技術的學習上，著重於美感直觀的設計與清晰流暢的開發；網站設計上，我以類似報紙和雜誌的風格作為基礎，使用淺米色和噪點填充背景以實現擬似紙張的質感，刻意封鎖不必要的操作事件 (如文字選取和圖片拖移)，加入滾動視差和點擊頁面時的漣漪效果來加強使用者與網站之間的互動體驗；此外在開發上也儘可能做到不依賴外部資料 (包括字體、框架和套件)，使用了些下方提及的方法，大大增強了網站的效能和載入速度。

### 外觀互動設計 & 開發紀錄

- 使用專為網頁設計的 WOFF2 (Web Open Font Format) 格式字體搭配 CSS `@font-face` 達成字體自託管。
- 使用 [Modern CSS Reset](https://www.joshwcomeau.com/css/custom-css-reset/) 初始化網頁樣式，並使用 [CSS Nesting](https://developer.chrome.com/docs/css-ui/css-nesting?hl=zh-tw) 風格撰寫樣式。
- 網站載入前遮擋畫面的 Loader 部分樣式以 inline 方式撰寫，以減少在網路速度較慢，或是由於 CSS 樣式的載入延遲或阻塞，導致 FOUC (Flash of Unstyled Content) — 頁面中的內容在沒有樣式的情況下短暫展示的狀況。
- 將 PNG 圖片壓縮成較小的 AVIF 與 WebP 格式，以及將 JSON 作品資料轉變為 HTML，而非透過 JavaScript 動態載入，減少網頁載入時間。
- 在網站載入完成前限制滾動，封鎖右鍵選單和圖片拖移等影響網站美感的事件，並加入點擊網頁任何地方產生漣漪的動畫效果，增強使用者與網站之間的互動體驗。
- 使用淺米色 `#eee` 和 [base64 躁點](http://noisepng.com/) 作為背景增添質感，讓瀏覽網頁時更有閱讀紙張的感覺。
- Loader 利用兩個不同動畫持續時間的上拉和下拉動畫，以及透過將部分元素綁定滾動事件和元素樣式 `transform: translateY( )`，搭配設置貝茲曲線 ([Cubic Bezier](https://cubic-bezier.com)) 參數調整動畫節奏，達成順暢自然的 Parallax 視差效果，另再透過 `requestAnimationFrame` 優化效能。
- 使用比滾動事件更具效能的 `IntersectionObserver` 監看多個元素是否進入或離開畫面以觸發動畫或漸變效果。
