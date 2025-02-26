import fs from "fs";
import path from "path";
import { execSync } from "child_process";

// Paths
const buildDir = "dist"; // Change if your build folder is different
const extensions = ["js", "css", "html", "json", "svg", "xml"];

// Ensure the compression tools are installed
const checkCommand = (cmd) => {
    try {
        execSync(cmd, { stdio: "ignore" });
        return true;
    } catch {
        return false;
    }
};

const brotliAvailable = checkCommand("brotli --version");
const gzipAvailable = checkCommand("gzip --version");

if (!brotliAvailable) console.warn("⚠️  Brotli is not installed. Skipping Brotli compression.");
if (!gzipAvailable) console.warn("⚠️  Gzip is not installed. Skipping Gzip compression.");

// Function to compress files
const compressFiles = (dir) => {
    fs.readdirSync(dir).forEach((file) => {
        const fullPath = path.join(dir, file);

        if (fs.statSync(fullPath).isDirectory()) {
            compressFiles(fullPath); // Recursive for subdirectories
        } else {
            const ext = file.split(".").pop();
            if (extensions.includes(ext)) {
                if (brotliAvailable) {
                    execSync(`brotli -Z --force "${fullPath}"`); // Brotli maximum compression
                }
                if (gzipAvailable) {
                    execSync(`gzip -k -9 "${fullPath}"`); // Gzip maximum compression
                }
                console.log(`✅ Compressed: ${file}`);
            }
        }
    });
};

// Run compression
console.log("🔄 Compressing build files...");
compressFiles(buildDir);
console.log("🎉 Compression complete!");
