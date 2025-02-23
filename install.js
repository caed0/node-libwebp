const path = require("path");
const fs = require("fs");
const { execSync } = require("child_process");

const LIBWEBP_VERSION = "1.5.0";
const BASE_URL = `https://storage.googleapis.com/downloads.webmproject.org/releases/webp/`;
const PLATFORM_MAP = {
    "win32-x64": "windows-x64.zip",
    "linux-x64": "linux-x86-64.tar.gz",
    "linux-arm64": "linux-aarch64.tar.gz",
    "darwin-x64": "macos-x86-64.tar.gz",
    "darwin-arm64": "macos-arm64.tar.gz"
};

const system = process.platform;
const arch = process.arch;
const key = `${system}-${arch}`;

const INSTALL_DIR = path.join(__dirname, "libwebp");

if (PLATFORM_MAP[key]) {
    const binaryFile = `libwebp-${LIBWEBP_VERSION}-${PLATFORM_MAP[key]}`;
    const binaryUrl = `${BASE_URL}${binaryFile}`;

    console.log(`Downloading prebuilt binary: ${binaryUrl}`);

    try {
        execSync(`curl -L ${binaryUrl} --output ${binaryFile}`, { stdio: "inherit" });

        if (binaryFile.endsWith(".zip")) {
            execSync(`unzip -qo ${binaryFile}`, { stdio: "inherit" });
            fs.renameSync(path.basename(binaryFile, path.extname(binaryFile)), INSTALL_DIR);
        } else {
            execSync(`mkdir -p ${INSTALL_DIR}`);
            execSync(`tar -xzf ${binaryFile} -C ${INSTALL_DIR} --strip-components=1`, { stdio: "inherit" });
        }

        if (fs.existsSync(binaryFile)) fs.unlinkSync(binaryFile);
        console.log("Successfully installed prebuilt libwebp.");
        process.exit(0);
    } catch (error) {
        if (fs.existsSync(binaryFile)) fs.unlinkSync(binaryFile);
        if (fs.existsSync(INSTALL_DIR)) fs.rmSync(INSTALL_DIR, { recursive: true, force: true });
        console.error("Failed to download prebuilt binary:", error);
        console.log("Falling back to source build...");
    }
}

console.log("No prebuilt binary found, compiling from source...");

const LIBWEBP_URL = `https://storage.googleapis.com/downloads.webmproject.org/releases/webp/libwebp-${LIBWEBP_VERSION}.tar.gz`;
const SRC_DIR = path.join(__dirname, `libwebp-${LIBWEBP_VERSION}`);
const DEST_DIR = path.join(__dirname, "libwebp");

try {
    execSync(`curl -L ${LIBWEBP_URL} | tar xz`, { stdio: "inherit" });
    process.chdir(SRC_DIR);

    console.log("Building libwebp...");
    execSync(`./configure --prefix=${DEST_DIR} && make && make install`, { stdio: "inherit" });

    fs.rmSync(SRC_DIR, { recursive: true, force: true });
    console.log("libwebp successfully compiled and installed.");
} catch (error) {
    try {
        if (fs.existsSync(`${SRC_DIR}.tar.gz`)) fs.unlinkSync(`${SRC_DIR}.tar.gz`);
        if (fs.existsSync(SRC_DIR)) fs.rmSync(SRC_DIR, { recursive: true, force: true });
        if (fs.existsSync(DEST_DIR)) fs.rmSync(DEST_DIR, { recursive: true, force: true });
    } catch (error) {}
    console.error("Failed to build libwebp:", error);
    process.exit(1);
}







