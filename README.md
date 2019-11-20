# abe-emailMinify
In case your abe application is used to create email, it can minifies the published html and/or css, respecting email standards.

It uses [html-crush](https://www.npmjs.com/package/html-crush) and [email-comb](https://www.npmjs.com/package/email-comb).
For ```minifyHtmlOptions``` and ```minifyCssOptions``` possiblities, see each package's documentation.

# Hook Possibilities
- [afterPublish](/../../tree/afterPublish)
  * It reads and writes an html file (with a possible suffix)
- pageSaveCompile (*current branch*)
  * It intercepts and minifies the html content before it's written to a file

# Install

``` bash 
abe install Retiixx/abe-emailMinify#pageSaveCompile
# Better to precise the branch even though it's the default one
```

# Config

``` javascript
"abe-emailMinify": {
  "active" : false, //boolean
  "minifyHtml": false, //boolean
  "minifyHtmlOptions": undefined, //object 
  "minifyCss": false, //boolean
  "minifyCssOptions": undefined, //object
}
```

# How it works

Everytime you publish a content, abe-emailMinify will intercepts the html content and minifies it before it's written to the file
