import fs from 'fs-extra'
import iconv from 'iconv-lite'

function safeName(appName) {
  return appName.replace(/ /g, '-')
}

function productID(appName, company = 'example', tld = 'com') {
  const cleanCompany = company.toLowerCase().replace(/[^a-z0-9]/g, '')
  const cleanAppName = appName.toLowerCase().replace(/[^a-z0-9]/g, '')
  return `${tld}.${cleanCompany}.${cleanAppName}`
}

function readStringsFile(filePath) {
  const buffer = fs.readFileSync(filePath);
  let encoding = 'utf8';
  if (buffer[0] === 0xFF && buffer[1] === 0xFE) {
    encoding = 'utf16le';
    return buffer.slice(2).toString('utf16le');
  }
  else if (buffer[0] === 0xFE && buffer[1] === 0xFF) {
    encoding = 'utf16be';
    return buffer.slice(2).toString('utf16be');
  }
  else if (buffer[0] === 0xEF && buffer[1] === 0xBB && buffer[2] === 0xBF) {
    encoding = 'utf8';
    return buffer.slice(3).toString('utf8');
  }
  else {
    try {
      return buffer.toString('utf16le');
    } catch (e) {
      return buffer.toString('utf8');
    }
  }
}

function writeStringsFile(filePath, modifications) {
  const buffer = fs.readFileSync(filePath);
  let originalContent = readStringsFile(filePath);
  const lines = originalContent.split('\n');
  let modifiedLines = [];
  lines.forEach(line => {
    const match = line.match(/^([^\s]+)\s*=\s*"([^"]+)";$/);
    if (match) {
      const key = match[1];
      if (modifications[key]) {
        modifiedLines.push(`${key} = "${modifications[key]}";`);
      } else {
        modifiedLines.push(line);
      }
    } else {
      modifiedLines.push(line);
    }
  });
  const modifiedContent = modifiedLines.join('\n');
  let outputBuffer;
  if (buffer[0] === 0xFF && buffer[1] === 0xFE) {
    const contentBuffer = iconv.encode(modifiedContent, 'utf16-le');
    outputBuffer = Buffer.concat([Buffer.from([0xFF, 0xFE]), contentBuffer]);
  } else if (buffer[0] === 0xFE && buffer[1] === 0xFF) {
    const contentBuffer = iconv.encode(modifiedContent, 'utf16-be');
    outputBuffer = Buffer.concat([Buffer.from([0xFE, 0xFF]), contentBuffer]);
  } else {
    const contentBuffer = iconv.encode(modifiedContent, 'utf16-le');
    outputBuffer = Buffer.concat([Buffer.from([0xFF, 0xFE]), contentBuffer]);
  }
  fs.writeFileSync(filePath, outputBuffer)
}

export { safeName, productID, readStringsFile, writeStringsFile }
