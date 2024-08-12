Highlight selected text in ACE editor.

[Base editor (build 1.35.4)](/project-samples/ace-editor/base-editor.html).

```js
editor.on('mouseup', onSelectionEnd);

function onSelectionEnd() {
    let range = editor.getSelectionRange();
    editor.session.addMarker(range, "ace_highlight-marker", "text");
    
    // https://ace.c9.io/api/interfaces/ace.Ace.EditSession.html#addMarker
}
```