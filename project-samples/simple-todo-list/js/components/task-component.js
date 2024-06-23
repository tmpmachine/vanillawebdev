let compoTask = (function() {
  
  let SELF = {
    AddItem,
    DeleteItem,
    GetAll,
  };
  
  let data = {
    items: [],
    
    // # model
    itemModel: {
      title: '',
    }
  };
  
  function AddItem(inputData) {
    let item = Object.assign({}, data.itemModel, inputData);
    data.items.push(item);
  }
  
  function DeleteItem(index) {
    data.items.splice(index, 1);
  }
  
  function GetAll() {
    return data.items;
  }
  
  return SELF;
  
})();