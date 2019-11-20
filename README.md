# abe-emailMinify
In case your abe application is used to create email, it can minifies the published html and/or css, respecting email standards.

It uses [html-crush](https://www.npmjs.com/package/html-crush) and [email-comb](https://www.npmjs.com/package/email-comb).
For ```minifyHtmlOptions``` and ```minifyCssOptions``` possiblities, see each package's documentation.

# Hook Possibilities
- afterPublish (*current branch*)
  * It reads and writes an html file (with a possible suffix)
- [pageSaveCompile](/Retiixx/abe-emailMinify/tree/pageSaveCompile)
  * It intercepts and minifies the html content before it's written to a file

# Install

``` bash 
abe install Retiixx/abe-emailMinify#publish
```

# Config

``` javascript
"abe-emailMinify": {
  "active" : false, //boolean
  "minifyHtml": false, //boolean
  "minifyHtmlOptions": undefined, //object 
  "minifyCss": false, //boolean
  "minifyCssOptions": undefined, //object
  "replaceFile": false //boolean
}
```

# How it works

Everytime you publish a content, abe-emailMinify will create/replace (depending of the config) a new html file
