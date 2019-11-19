'use strict'
const path = require('path')
const fs = require('fs')
const {crush} = require('html-crush')
const {comb} = require('email-comb')

var configName = 'abe-emailMinify'
var minExtension = '.min'

var hooks = {
  afterPublish: function(result, postPath, abe){
    var config = abe.config[configName]
    if (config && config.active){
      const documentPath = path.join(abe.config.root, abe.config.publish.url)
      const baseName = path.basename(result.abe_meta.publish.abeUrl)
      const extName = path.extname(result.abe_meta.publish.abeUrl)
      const filePath = path.join(documentPath, baseName)
      
      try{
        var originalData, data
        originalData = data = fs.readFileSync(filePath, 'utf8')

        if (config.minifyHtml) {
          data = crush(data, config.minifyHtmlOptions).result
        }
        if (config.minifyCss) {
          data = comb(data, config.minifyCssOptions).result
        }
          
        const destFileName = path.basename(baseName, extName) + (config.replaceFile ?'': minExtension) + extName
        const destFilePath = path.join(path.dirname(filePath), destFileName)

        if (originalData !== data){
          try {
            fs.writeFileSync(destFilePath, data)
          }
          catch(err){
            console.error(err)
          }
        } else {
          console.info('emailMinify: The data didn\'t change, file not overwritten')
          return result
        }
      } catch (err){
        console.error(err)
        return result
      }
      return result
    }
  },
  afterUnpublish: function(jsonPath, postPath, abe){
      const baseName = path.basename(postPath)
      const extName = path.extname(postPath)
      const destFileName = path.basename(baseName, extName) + minExtension + extName
      const destFilePath = path.join(path.dirname(postPath), destFileName)

      if (fs.existsSync(destFilePath)){
        fs.unlinkSync(destFilePath)
      }
      return jsonPath
  }
}

exports.default = hooks;