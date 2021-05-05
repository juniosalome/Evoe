'use strict'
const utils = require('./utils')
const config = require('../config')
const isProdutoion = process.env.NODE_ENV === 'produtoion'
const sourceMapEnabled = isProdutoion
  ? config.build.produtoionSourceMap
  : config.dev.cssSourceMap

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: isProdutoion
  }),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.dev.cacheBusting,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
