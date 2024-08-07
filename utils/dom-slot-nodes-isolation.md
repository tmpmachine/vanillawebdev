```js
function GetSlotEl(itemEl) {
    let slotData = Array.from(itemEl.querySelectorAll('[data-slot]')).map(x => {
      return {
        key: x.dataset.slot,
        el: x,
      };
    });
    let slotObj = slotData.reduce((obj, item) => {
      obj[item.key] = item.el;
      return obj;
    }, {});
    
    return slotObj;
}
```

Usage:
```html
<div class="_container1">
  <p data-slot="desc">Lorem ipsum</p>
</div>
```
```js
let parentElement = document.querySelector('._container1');
let slotNodes = GetSlotEl(parentElement);
slotNodes.desc.textContent = 'Hello JS';
```
