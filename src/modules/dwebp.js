const { execSync } = require('child_process');
const path = require('path');
const os = require("os");
const fs = require("fs");

module.exports = (dwebp) =>

    /**
     * @typedef {Object} CropOptions
     * @property {number} x - X-Coodinate of the top-left corner.
     * @property {number} y - Y-Coodinate of the top-left corner.
     * @property {number} width - Width of the cropped image.
     * @property {number} height - Width of the cropped image.
     */

    /**
     * @typedef {Object} ResizeOptions
     * @property {number} width - New width of the image.
     * @property {number} height - New height of the image.
     */

    /**
     * @typedef {Object} DitherOptions
     * @property {number} [strength] - Dither strength. (0=Off, 100=Full)
     * @property {boolean} [alpha_dither] - Use alpha dithering.
     * @property {boolean} [nodither] - Disable dithering. (Overrides other dither options)
     */

    /**
     * @typedef {"pam" | "ppm" | "bmp" | "tiff" | "pgm" | "yuv" | "png"} Format
     */

    /**
     * @typedef {Object} DwebpOptions
     * @property {Format} [format] - Format to convert the image to. (Default: "png")
     * @property {CropOptions} [crop] - Crop the image.
     * @property {ResizeOptions} [resize] - Resize the image.
     * @property {boolean} [flip] - Flip the image vertically.
     * @property {DitherOptions} [dither] - Dithering options.
     * @property {boolean} [nofancy] - Disables fancy YUV420-to-RGB conversion.
     * @property {boolean} [nofilter] - Disables in-loop filtering.
     * @property {boolean} [alpha] - Save the alpha plane.
     * @property {boolean} [mt] - Use multi-threading.
     */


    /**
     * Konvertiert eine WebP-Datei in ein anderes Format.
     *
     * @param {string} input - Pfad zur Eingabedatei.
     * @param {string} [output] - Pfad zur Ausgabedatei.
     * @param {DwebpOptions?} [options] - Konfigurationsobjekt mit Einstellungen.
     */

(input, output, options) => {
        const {
                format = "png",
                crop,
                resize,
                flip,
                dither,
                nofancy,
                nofilter,
                alpha,
                mt,
                noasm
        } = options;

        let command = `${dwebp} "${input}" -quite`;

        if (format && format !== "png") {
            command += ` -${format}`;
        }

        if (crop) {
            command += ` -crop ${crop.x} ${crop.y} ${crop.width} ${crop.height}`;
        }

        if (resize) {
            command += ` -resize ${resize.width} ${resize.height}`;
        }

        if (flip) {
            command += " -flip";
        }

        if (dither) {
            if (dither.nodither) {
                command += " -nodither";
            } else {
                if (dither.strength) {
                        command += ` -dither ${dither.strength}`;
                }

                if (dither.alpha_dither) {
                    command += " -alpha_dither";
                }
            }
        }

        if (nofancy) {
            command += " -nofancy";
        }

        if (nofilter) {
            command += " -nofilter";
        }

        if (alpha) {
            command += " -alpha";
        }

        if (mt) {
            command += " -mt";
        }

        let temp;
        if (output) {
            command += ` -o "${output}"`;
        } else {
            temp = `${os.tmpdir()}/${Date.now()}.${format}`;
            command += ` -o ${temp}`;
        }

        execSync(command);

        if (output) {
            if(fs.existsSync(output)) {
                return output;
            } else {
                throw new Error("Output file not found");
            }
        } else {
            if (fs.existsSync(temp)) {
                return fs.readFileSync(temp);
            } else {
                throw new Error("Output file not found");
            }
        }
}