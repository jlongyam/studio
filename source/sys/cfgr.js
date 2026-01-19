
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import process from 'node:process';

// Determine the correct file based on the user's shell (or just pick one)
const shellConfigFile = process.env.SHELL.includes('zsh') ? '.zshrc' : '.bashrc';
const configPath = path.join(os.homedir(), shellConfigFile);

// console.log(shellConfigFile);
// console.log(configPath);
const it_contents = fs.readFileSync(configPath, 'utf-8');
// console.log(it_contents);
const arr_line = it_contents.split('\n');
// console.log(arr_line);
const arr_temp = [];
// let s = '';
// let b = '';
arr_line.forEach(line => {
  // let l = parseInt(line.length);
  if (line.length !== 0) {
    if (line.substring(0, 1) !== '#') {
      if (line.indexOf('ZSH_THEME="intheloop"') !== -1) {
        const k = line.split('=');
        const y = k[0] + '=' + '"JOKER"';
        line = y;
        //continue;
      }
    }
  }
  // ;
  // if (line.substring(0, 1) !== '#') {
    // if (line.includes('ZSH_THEME="')) {
      
      // s = line;
      // b = s.replace()
    // }
  // }
  arr_temp.push(line);
});
console.log(arr_temp.join('\n'));
// console.log(s);
//const lineToAdd = 'export MY_CUSTOM_VAR="hello_from_nodejs"\n';
/* 
fs.appendFile(configPath, lineToAdd, (err) => {
  if (err) {
    console.error(`Error modifying ${configPath}:`, err);
  } else {
    console.log(`Successfully added line to ${configPath}.`);
    console.log('Please run "source ~/' + shellConfigFile + '" or open a new terminal session for the changes to take effect.');
  }
});
*/