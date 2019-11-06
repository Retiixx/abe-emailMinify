'use strict'
var path = require('path')
var fs = require('fs')
var {crush} = require('html-crush')
var {comb} = require('email-comb')

var hooks = {
  afterPublish: function(result, postPath, abe){
    console.log(result, postPath, abe)
    if (abe.config["abe-emailMinify"].active){
      const documentPath = path.join(abe.config.root, abe.config.publish.url)
			const fileName = path.basename(result.abe_meta.publish.abeUrl)
			const packageDate = Math.floor(new Date())
    }
  }
}

exports.default = hooks;