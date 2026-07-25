```javascript
let prices = [];
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === 'CHART_DATA') {
    prices.push(msg.payload.price);
    if (prices.length > 50) prices.shift();
    let signal = 'WAITING...';
    if (prices.length >= 14) {
      let gain = 0, loss = 0;
      for (let i = prices.length - 14; i < prices.length - 1; i++) {
        let diff = prices[i+1] - prices[i];
        diff >= 0 ? gain += diff : loss -= diff;
      }
      let rsi = 50;
      if (loss !== 0) rsi = 100 - (100 / (1 + (gain / 14) / (loss / 14)));
      signal = (rsi < 30) ? '📈 BUY' : (rsi > 70) ? '📉 SELL' : '⏸️ HOLD';
      chrome.storage.local.set({ signal, price: prices[prices.length-1], rsi: rsi.toFixed(1) });
    }
  }
});
```
