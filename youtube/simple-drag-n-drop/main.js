// utility function
function initDropZone() {
    const dropZone = document.getElementById('drop-zone');
  
    window.addEventListener('dragover', (e) => {
        e.preventDefault();
  
        dropZone.style.display = 'block'; // Show the drop zone
        dropZone.style.borderColor = 'blue';
    });
  
    dropZone.addEventListener('dragleave', () => {
        dropZone.style.display = 'none'; // Hide the drop zone
    });
  
    dropZone.addEventListener('drop', async (e) => {
        e.preventDefault();
        dropZone.style.display = 'none'; // Hide the drop zone
        dropZone.style.borderColor = '#ccc';
  
        for (const item of e.dataTransfer.items) {
          if (item.kind === 'file') {
            let file = item.getAsFile();

            readFile(file);

            // todo
          }
        }
  
    });

    function readFile(file) {
        let reader = new FileReader();
        reader.onload = async function() {
            document.querySelector('#txtOuput').replaceChildren(reader.result);
        };
        reader.readAsText(file);
    }

}

initDropZone();
