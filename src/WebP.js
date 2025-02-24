const { execSync } = require('child_process');

let libwebp;
try {
  libwebp = require('libwebp-static');
} catch (e) {}


class WebP {
  constructor() {
    if (execSync('command -v dwebep').toString().trim()) {
      this.binaries = {
        anim_diff: 'anim_diff',
        anim_dump: 'anim_dump',
        cwebp: 'cwebp',
        dwebp: 'dwebp',
        get_disto: 'get_disto',
        gif2webp: 'gif2webp',
        img2webp: 'img2webp',
        vwebp: 'vwebp',
        webp_quality: 'webp_quality',
        webpinfo: 'webpinfo',
        webpmux: 'webpmux'
      };
    } else if (libwebp) {
      this.binaries = libwebp;
    } else {
        throw new Error('WebP binaries not found');
    }

    this.cwebp = require('modules/cwebp')(this.binaries.cwebp);
    this.dwebp = require('modules/dwebp')(this.binaries.dwebp);
    this.webpinfo = require('modules/webpinfo')(this.binaries.webpinfo);
    this.webpmux = require('modules/webpmux')(this.binaries.webpmux);
    this.anim_dump = require('modules/anim_dump')(this.binaries.anim_dump);
    //this.anim_diff = require('modules/anim_diff')(this.binaries.anim_diff);
    //this.get_disto = require('modules/get_disto')(this.binaries.get_disto);
    //this.gif2webp = require('modules/gif2webp')(this.binaries.gif2webp);
    //this.img2webp = require('modules/img2webp')(this.binaries.img2webp);
    //this.vwebp = require('modules/vwebp')(this.binaries.vwebp);
    //this.webp_quality = require('modules/webp_quality')(this.binaries.webp_quality);
  }
}

module.exports = WebP;