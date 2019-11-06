# abe-emailMinify
In case your abe application is used to create email, it can minifies the published html and/or css, respecting email standards

# Install

``` bash 
abe install Retiixx/abe-emailMinify
```

# Config

``` json
"abe-emailMinify": {
  "active" : <boolean> false,
  "minifyHtml": <boolean> false,
  "minifyHtmlOptions": <object> null,
  "minifyCss": <boolean> false,
  "minifyCssOptions": <object> null,
  "replaceFile": <boolean> false
}
```

# How it works

Everytime you publish a content, abe-emailMinify will create/replace (depending of the config) a new html file