'use strict'
const path = require('path')
const fs = require('fs')
const util = require('util')
const {crush} = require('html-crush')
const {comb} = require('email-comb')

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

var configName = 'abe-emailMinify'

var hooks = {
  afterPublish: function(result, postPath, abe){
    if (true || abe.config[configName] && abe.config[configName].active){
      const documentPath = path.join(abe.config.root, abe.config.publish.url)
      const baseName = path.basename(result.abe_meta.publish.abeUrl)
      const extName = path.extname(result.abe_meta.publish.abeUrl)
      const filePath = path.join(documentPath, baseName)
      
      readFile(filePath, 'utf8').then((data) => {
          var crushed = crush(data)
          const destFileName = path.basename(baseName, extName) + '.min' + extName
          const destFilePath = path.join(path.dirname(filePath), destFileName)
          writeFile(destFilePath, crushed.result).catch(err => console.log(err))
      })
    }
  }
}

exports.default = hooks;