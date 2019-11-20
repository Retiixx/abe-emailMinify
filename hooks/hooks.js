'use strict'
const {crush} = require('html-crush')
const {comb} = require('email-comb')

var configName = 'abe-emailMinify'

var hooks = {
  afterPageSaveCompile: function(originalHtml, json, abe){
    var config = abe.config[configName]
    if (config && config.active){
      var html = originalHtml
      try{
        if (config.minifyHtml) {
          html = crush(html, config.minifyHtmlOptions).result
        }
        if (config.minifyCss) {
          html = comb(html, config.minifyCssOptions).result
        }
        
        if (originalHtml !== html){
          return html
        } else {
          console.info('emailMinify: The data didn\'t change, file not overwritten')
          return originalHtml
        }
      } catch (err){
        console.error(err)
        return originalHtml
      }
    }
    return originalHtml
  }
}

exports.default = hooks;