const { execSync } = require('child_process');
const path = require('path');
const { validateOptions } = require('../utils/validate');

const VALID_OPTIONS = {
    format: 'string',
    nofancy: 'boolean',
    nofilter: 'boolean',
    nodither: 'boolean',
    dither: 'number',
    alpha_dither: 'boolean',
    mt: 'boolean',
    crop: 'object',
    resize: 'object',
    flip: 'boolean',
    alpha: 'boolean',
    noasm: 'boolean'
};

const VALID_FORMATS = ['pam', 'ppm', 'bmp', 'tiff', 'pgm', 'yuv', 'png'];

const VALID_CROP = {
    x: 'number',
    y: 'number',
    w: 'number',
    h: 'number'
}

const VALID_RESIZE = {
    w: 'number',
    h: 'number'
}

module.exports = (dwebp) => (inputFile, outputFile = undefined, options = {}) => {
    const { format, nofancy, nofilter, nodither, dither, alpha_dither, mt, crop, resize, flip, alpha, noasm } = options;

    let invalid = validateOptions(options, VALID_OPTIONS);
    if (invalid)
        throw new Error(invalid);

    const ext = path.extname(outputFile).slice(1);
    if (format && !VALID_FORMATS.includes(format))
        throw new Error(`Invalid output file format: ${ext}`);

    if (dither && (dither > 100 || dither < 0))
        throw new Error(`Dithering strength out of range: expected 0 ... 100, got ${dither}`);

    invalid = validateOptions(crop, VALID_CROP);
    if (invalid) throw new Error();





















    const args = [inputFile, '-quite'];

    if (outputFile) {
        const ext = path.extname(outputFile).slice(1);
        if (!validExtensions.includes(ext)) {
            throw new Error(`Invalid output file format: ${ext}`);
        }

        switch (ext) {
            case 'pam':
                args.push('-pam');
                break;
            case 'ppm':
                args.push('-ppm');
                break;
            case 'bmp':
                args.push('-bmp');
                break;
            case 'tif':
            case 'tiff':
                args.push('-tiff');
                break;
            case 'pgm':
                args.push('-pgm');
                break;
            case 'yuv':
                args.push('-yuv');
                break;
            default:
                break;
        }
    } else {
        throw new Error('Output file must be specified');
    }

    if (options.nofancy) args.push('-nofancy');
    if (options.nofilter) args.push('-nofilter');
    if (options.nodither) {
        args.push('-nodither');
        options.dither = undefined;
        options.alpha_dither = false;
    }
    if (options.dither !== undefined) args.push(`-dither`, options.dither);
    if (options.alpha_dither) args.push('-alpha_dither');
    if (options.mt) args.push('-mt');
    if (options.crop) args.push(`-crop`, options.crop.x, options.crop.y, options.crop.w, options.crop.h);
    if (options.resize) args.push(`-resize`, options.resize.w, options.resize.h);
    if (options.flip) args.push('-flip');
    if (options.alpha) args.push('-alpha');
    if (options.noasm) args.push('-noasm');

    args.push('-o', outputFile);
    execSync(dwebp, args, (error) => { if (error) console.error('Error executing dwebp command:', error); });
}