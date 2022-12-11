const fetch = require('node-fetch');

fetch('https://wp.pl')
  .then((r) => r.text())
  .then((html) => console.log(html));
