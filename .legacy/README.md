Build with Landwind-Tailwind CSS template.

Straightforward. Open index.html and navigate the web. No installations necessary.

### Integration with BibBase
Use the following to display BibBase content.

JavaScript (easiest)
```
<script src="https://bibbase.org/show?bib=https%3A%2F%2Fbibbase.org%2Fzotero-group%2Ftobiashaposan%2F6590780&jsonp=1"></script>
```

PHP
```
<?php $contents = file_get_contents("https://bibbase.org/show?bib=https%3A%2F%2Fbibbase.org%2Fzotero-group%2Ftobiashaposan%2F6590780"); print_r($contents); ?>
```
iFrame (not recommended)
```
<iframe src="https://bibbase.org/show?bib=https%3A%2F%2Fbibbase.org%2Fzotero-group%2Ftobiashaposan%2F6590780"></iframe>
```

For more details see the documention. 
