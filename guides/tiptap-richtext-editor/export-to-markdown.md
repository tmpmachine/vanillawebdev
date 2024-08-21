Guide video: [https://youtu.be/76LqIPsgDvQ](https://youtu.be/76LqIPsgDvQ)

TipTap editor does have an [extension for exporting to markdown](https://tiptap.dev/docs/editor/extensions/functionality/export). This guide is using [mixmark-io/turndown](https://github.com/mixmark-io/turndown) library.

[Sample Project (Complete Code).](/project-samples/tiptap-richtext/export-to-markdown.html)

Code Snippet
------------

```html
<script src="https://unpkg.com/turndown/dist/turndown.js"></script>
```

```js
let turndownService = new TurndownService({
  codeBlockStyle: 'fenced',
});

function exportToMarkdown() {
  let html = editor.getHTML();
  let markdown = turndownService.turndown(html);
  
  console.log(markdown);  
}
```