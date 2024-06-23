let uiTask = (function() {
  
  let $ = document.querySelector.bind(document);
  
  let SELF = {
    HandleClickList,
    RefreshList,
  };
  
  function handleClickAction(itemEl, action) {
    let data = {
      index: itemEl.dataset.index,
    };
    
    switch (action) {
      case 'delete': deleteItem(data); break;
    }
  }
  
  function deleteItem(data) {
    let isConfirm = window.confirm('Are you sure?');
    if (!isConfirm) return;
    
    compoTask.DeleteItem(parseInt(data.index));
    
    RefreshList();
  }
  
  
  function RefreshList() {
    let items = compoTask.GetAll();
    let containerEl = $('._taskList');
    let templateEl = $('#tmp-task');
    let docFrag = document.createDocumentFragment();
    
    containerEl?.replaceChildren();
    
    if (items?.length > 0) {
      let index = -1;
      for (let item of items) {
        let node = templateEl?.content.cloneNode(true);
        
        node.querySelector('[data-kind="item"]').dataset.index = ++index;
        node.querySelector('.title').replaceChildren(item.title);
        
        docFrag.append(node);
      }
    }
    
    containerEl?.append(docFrag);
  }
  
  
  function HandleClickList(evt) {
    let targetEl = evt.target;
    let itemEl = targetEl?.closest('[data-kind="item"]');
    let action = targetEl?.closest('[data-action]')?.dataset.action;
    
    if (!itemEl) return;
    
    handleClickAction(itemEl, action);
  }
    
  return SELF;
  
})();