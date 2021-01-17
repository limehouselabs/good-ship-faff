#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function printHelpAndExit() {
  process.stdout.write(`
Usage:
 - pack.js <path/to/submarine.sub> [targetdir]
   Unpacks a .sub file to XML.
   If the targetdir parameter is passed, will unpack to that directory.
   Otherwise, will unpack to the current working directory.
 - pack.js <path/to/submarine.xml> [targetdir]
   Packs an XML file to .sub format.
   If targetdir is specified, the .sub file will be created in that folder.
   Setting environment variable BAROTRAUMA_SUB_DIRECTORY will default to that directory.
   Otherwise, will pack to the currnet working directory.\n\n`);
  process.exit(1);
}

let file = process.argv[2];
if (!file) {
  printHelpAndExit();
}

const extname = path.extname(file);
if (!~['.sub', '.xml'].indexOf(extname)) {
  printHelpAndExit();
}

const isUnpack = path.extname(file) === '.sub';

if (isUnpack) {
  extractXml();
} else {
  createSub();
}

function createSub() {
  const gzip = zlib.createGzip();
  const fileIn = fs.createReadStream(file);

  const targetDir = process.argv[3] || process.env.BAROTRAUMA_SUB_DIRECTORY || process.cwd();

  const fileName = path.parse(file).name;
  const outputFileName = path.join(targetDir, fileName + '.sub');
  const fileOut = fs.createWriteStream(outputFileName);

  fileIn.pipe(gzip).pipe(fileOut).on('finish', () => {
    process.stdout.write(`Packed ${fileName}.xml to ${outputFileName}\n`);
    process.exit(0);
  });
}

function extractXml() {
  const gunzip = zlib.createGunzip();

  if (!fs.existsSync(file) &&
    process.env.BAROTRAUMA_SUB_DIRECTORY && fs.existsSync(path.join(process.env.BAROTRAUMA_SUB_DIRECTORY, file))) {
    file = path.join(process.env.BAROTRAUMA_SUB_DIRECTORY, file);
  }
  const fileIn = fs.createReadStream(file);

  const fileName = path.parse(file).name;

  const targetDir = process.argv[3] || process.cwd();
  const outputFileName = path.join(targetDir, fileName + '.xml');

  const fileOut = fs.createWriteStream(outputFileName);

  fileIn.pipe(gunzip).pipe(fileOut).on('finish', () => {
    process.stdout.write(`Extracted ${fileName}.sub to ${outputFileName}\n`);
    process.exit(0);
  });
}
