let ui = (function() {
  
  let $ = document.querySelector.bind(document);
  
  let SELF = {
    HandleSubmit,
  };
  
  function HandleSubmit(evt) {
    evt.preventDefault();
    
    let form = evt.target;
    let formData = {};
    let formSchema = [
      { name: 'title' },
    ];
    formSchema.map(({name, type}) => {
      formData[name] = form.querySelector(`[name="${name}"]`)?.value;
    });
    
    compoTask.AddItem(formData);
    
    uiTask.RefreshList();
    
  }

  return SELF;
  
})();