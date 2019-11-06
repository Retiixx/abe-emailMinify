'use strict'
const path = require('path')
const fs = require('fs')
const util = require('util')
const {crush} = require('html-crush')
const {comb} = require('email-comb')

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

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
      
      readFile(filePath, 'utf8').then((data) => {
        var originalData = data
        if (config.minifyHtml) {
          data = crush(data, config.minifyHtmlOptions).result
        }
        if (config.minifyCss) {
          data = comb(data, config.minifyCssOptions).result
        }
          
        const destFileName = path.basename(baseName, extName) + (config.replaceFile ?'': minExtension) + extName
        const destFilePath = path.join(path.dirname(filePath), destFileName)

        if (originalData !== data){
          writeFile(destFilePath, data).catch(err => console.log(err))
        } else {
          console.info('emailMinify: The data didn\'t change, file not overwritten')
        }
      })
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
  }
}

exports.default = hooks;