# rayc.dev｜不依賴套件和框架的作品集網站

[![cover](/assets/images/cover.png)](https://rayc2045.netlify.app/)

### 專案簡介

我始終認為，設計與開發是一體兩面，設計本是為開發而存在，開發也是為了完成設計，兩者相輔相成、互相影響，因此在網站主頁使用了聖保羅教堂的去背圖與對設計和開發的詮釋，表現自己在前端技術的學習上，著重於美感直觀的設計與清晰流暢的開發；網站設計上，我以類似報紙和雜誌的風格作為基礎，使用淺米色和噪點填充背景以實現擬似紙張的質感，刻意封鎖不必要的操作事件 (如文字選取和圖片拖移)，加入滾動視差和點擊頁面時的漣漪效果來加強使用者與網站之間的互動；此外在開發上也儘可能做到不依賴外部資料 (包括字體、框架和套件)，使用了些下方提及的方法，大大增強了網站的效能和載入速度。

### 外觀互動設計 & 開發紀錄

- 使用專為網頁設計的 WOFF2 (Web Open Font Format) 格式字體搭配 CSS `@font-face` 達成字體自託管。
- 使用 [Modern CSS Reset](https://www.joshwcomeau.com/css/custom-css-reset/) 初始化網頁樣式，並採用 [巢狀風格](https://developer.chrome.com/docs/css-ui/css-nesting?hl=zh-tw) 撰寫更為簡潔和易讀的樣式。
- 網站載入前遮擋畫面的 Loader 以 inline 方式內嵌樣式，減少在網路速度較慢，或是由於 CSS 樣式的載入延遲或阻塞，導致 FOUC (Flash of Unstyled Content) — 頁面中的內容在沒有樣式的情況下短暫展示的狀況。
- 將 JSON 作品資料轉換為靜態 HTML，而非透過 JavaScript 動態載入，有效減少頁面加載時間。
- 將 PNG 圖片壓縮為更小的 AVIF 與 WebP 格式，並對首屏以外的圖片使用 [延遲載入](https://web.dev/articles/browser-level-image-lazy-loading?hl=zh-tw)，進一步提升網站效能。
- 在頁面完全載入前限制滾動，並禁用右鍵選單與圖片拖移以保持整體美感整潔，並加入點擊網頁產生漣漪效果的動畫，增強使用者與網站之間的互動。
- 使用淺米色 `#eee` 和 [base64 躁點](http://noisepng.com/) 作為背景增添質感，讓瀏覽網頁時更有閱讀紙張的體驗。
- 為 Loader 設計兩個不同時長的上拉和下拉過渡動畫，以及透過將部分元素綁定滾動事件和元素樣式 `transform: translateY()`，搭配設置 [Cubic Bezier](https://cubic-bezier.com/) 貝茲曲線參數調整動畫節奏，達成順暢自然的視差效果，另再透過 `requestAnimationFrame` 進一步優化效能。
- 使用比滾動事件更高效的 `IntersectionObserver` 監看多個元素是否進入或離開畫面以觸發動畫或漸變效果。
- 聯絡表單結合 [Netlify Forms](https://www.netlify.com/platform/core/forms/)，自動過濾騷擾訊息及 Gmail 來信通知。

---

## rayc.dev | Portfolio Website Built Without Libraries or Frameworks

### Project Overview

I firmly believe that design and development are two sides of the same coin. Design exists to serve development, and development exists to realize design—they complement and influence each other. To embody this philosophy, the homepage features a cutout image of St. Paul’s Cathedral paired with a dual interpretation of design and development, reflecting my focus on intuitive, aesthetic design and seamless, efficient coding in frontend learning.

The website design takes inspiration from newspaper and magazine layouts, with light beige tones and noise textures to simulate the feel of paper. To enhance user experience, I deliberately disabled unnecessary interactions (e.g., text selection and image dragging) and incorporated parallax scrolling and ripple effects on clicks to create a more engaging interface.

On the development side, I avoided reliance on external resources—including fonts, frameworks, and libraries—while applying various methods detailed below to significantly boost performance and loading speed.

### Highlights of Visual Design, Interaction Design, and Development

- Implemented self-hosted WOFF2 fonts (Web Open Font Format) via CSS `@font-face` for optimized web typography.
- Used [Modern CSS Reset](https://www.joshwcomeau.com/css/custom-css-reset/) to initialize styles and leveraged [CSS Nesting](https://developer.chrome.com/docs/css-ui/css-nesting?hl=en) for cleaner, readable, and organized styling.
- Inline styling was applied to the loader to prevent FOUC (Flash of Unstyled Content) caused by delayed or blocked CSS loading on slower networks.
- Converted JSON project data into static HTML instead of dynamically loading it with JavaScript, reducing page load time.
- Compressed PNG images into smaller AVIF and WebP formats and applied [lazy loading](https://web.dev/articles/browser-level-image-lazy-loading?hl=en) for images outside the viewport to enhance performance.
- Restricted scrolling before the page fully loads and disabled context menus and image dragging to preserve the website's aesthetic integrity. Added ripple animations on clicks for a more interactive experience.
- Used a light beige color (`#eee`) and [base64 noise](http://noisepng.com/) as background textures to simulate a tactile, paper-like reading experience.
- Created parallax effects using dual-duration animations for pull-up and pull-down transitions on the loader, combined with `transform: translateY()` styles triggered by scroll events. Tweaked animation pacing using [Cubic Bezier](https://cubic-bezier.com/) parameters for natural movement and optimized performance with `requestAnimationFrame`.
- Replaced scroll events with the more efficient `IntersectionObserver` to detect elements entering or leaving the viewport, triggering animations or transitions accordingly.
- Integrated the contact form with [Netlify Forms](https://www.netlify.com/platform/core/forms/) for spam filtering and email notifications via Gmail.
