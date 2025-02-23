const anim_diff = require('modules/anim_diff');
const anim_dump = require('modules/anim_dump');
const cwebp = require('modules/cwebp');
const dwebp = require('modules/dwebp');
const get_disto = require('modules/get_disto');
const gif2webp = require('modules/gif2webp');
const img2webp = require('modules/img2webp');
const vwebp = require('modules/vwebp');
const webp_quality = require('modules/webp_quality');
const webpinfo = require('modules/webpinfo');
const webpmux = require('modules/webpmux');

class WebP {
  constructor() {
    this.anim_diff = anim_diff;
    this.anim_dump = anim_dump;
    this.cwebp = cwebp;
    this.dwebp = dwebp;
    this.get_disto = get_disto;
    this.gif2webp = gif2webp;
    this.img2webp = img2webp;
    this.vwebp = vwebp;
    this.webp_quality = webp_quality;
    this.webpinfo = webpinfo;
    this.webpmux = webpmux;
  }
}