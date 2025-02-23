const { execSync } = require('child_process');
const path = require('path');

module.exports = (inputFile, options = {}, outputFile) => {
    let command = `dwebp ${inputFile}`;
    const validExtensions = ['pam', 'ppm', 'bmp', 'tif', 'tiff', 'pgm', 'yuv', 'png'];

    if (outputFile) {
        const ext = path.extname(outputFile).slice(1);
        if (!validExtensions.includes(ext)) {
            throw new Error(`Invalid output file format: ${ext}`);
        }

        switch (ext) {
            case 'pam':
                command += ' -pam';
                break;
            case 'ppm':
                command += ' -ppm';
                break;
            case 'bmp':
                command += ' -bmp';
                break;
            case 'tif':
                command += ' -tiff';
                break;
            case 'tiff':
                command += ' -tiff';
                break;
            case 'pgm':
                command += ' -pgm';
                break;
            case 'yuv':
                command += ' -yuv';
                break;
            default:
                break;
        }

        command += ` -o ${outputFile}`;
    } else {
        throw new Error('Output file must be specified');
    }

    if (options.nofancy) command += ' -nofancy';
    if (options.nofilter) command += ' -nofilter';
    if (options.nodither) {
        command += ' -nodither';
        options.dither = undefined;
    }
    if (options.dither !== undefined) command += ` -dither ${options.dither}`;
    if (options.alpha_dither) command += ' -alpha_dither';
    if (options.mt) command += ' -mt';
    if (options.crop) command += ` -crop ${options.crop.x} ${options.crop.y} ${options.crop.w} ${options.crop.h}`;
    if (options.resize) command += ` -resize ${options.resize.w} ${options.resize.h}`;
    if (options.flip) command += ' -flip';
    if (options.alpha) command += ' -alpha';
    command += ' -quiet';
    if (options.noasm) command += ' -noasm';

    try {
        execSync(command, { stdio: 'inherit' });
    } catch (error) {
        console.error('Error executing dwebp command:', error);
    }
}