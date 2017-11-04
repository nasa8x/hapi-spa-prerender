Hapi plugin for prerendering Single Page Application (javascript rendered use Vue.js, Angular, React, Ember, Aurelia, Backbone...) on the fly for SEO.

The plugin will detect the crawler when the request arrives and return html data.

## Install

```js
npm install hapi-spa-prerender
```


## Usage

```js
var Hapi = require('hapi'),
    prerender = require('hapi-spa-prerender');

var server = new Hapi.Server();
server.connection({ port: 8080, host: 'localhost' });

// default config
server.register([
    {
        register: prerender,
        options:{
            token: 'krawl.org token'
        }
    }
   ], function (err) {

      
});

```

## Custom options

```js

// default config
server.register([
    {
        register: prerender,
        options:{
            token: 'krawl.org token',
            excludes:[
                /upload\/.*?/ig, // exclude any file contain upload path
                /js\/.*?/ig,
                /css\/.*?/ig,
                /^.+\.(?:css|cur|js|jpe?g|gif|htc|ico|png|json|xml|otf|ttf|eot|tif|woff|svg|txt|mp3|mp4|ppt|mpg|rss|zip|rar|doc|docx|wmv|avi|wav|mov|m4v|flv|psd|ai|xls|torrent|dat|iso|dmg).*?/ig // exclude path contain any extentions
            ]
        }
    }
   ], function (err) {

      
});

```

## License

The MIT License (MIT)

Copyright (c) 2017 Nasa Nguyen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.