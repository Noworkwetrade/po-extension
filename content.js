```javascript
setInterval(() => {
  // ⚠️ IMPORTANT: You MUST change the selector below in Phase 5 ⚠️
  const priceElement = document.querySelector('.current-price'); 
  if (priceElement) {
    let price = parseFloat(priceElement.textContent.replace(/[, ]/g, ''));
    if (!isNaN(price)) {
      chrome.runtime.sendMessage({ type: 'CHART_DATA', payload: { price } });
    }
  }
}, 3000);
console.log("Content script is running...");
```
