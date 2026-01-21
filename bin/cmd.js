#!/usr/bin/env node
import config from "../package.json" with { type: 'json' }
import { Command } from "commander"

const program = new Command()

function handleLegacy(options) {
  if (options.install) {
    console.log('Installing legacy components...');
  } else if (options.run) {
    console.log('Running legacy system...');
  } else if (options.build) {
    console.log('Building legacy components...');
  } else if (options.clean) {
    console.log('Cleaning legacy files...');
  } else if (options.uninstall) {
    console.log('Uninstalling legacy system...');
  } else {
    console.log('Running main legacy task...');
  }
}

program
  .name('jl-studio')
  .description('A CLI tool for this project')
  .version(config.version, '-v, --version', 'Display version');

program
  .command('help')
  .description('Show help')
  .action(() => {
    program.help();
  });

program
  .command('legacy')
  .description('Legacy system operations')
  .option('-i, --install', 'Install legacy components')
  .option('-r, --run', 'Run legacy system')
  .option('-b, --build', 'Build legacy components')
  .option('-c, --clean', 'Clean legacy files')
  .option('-u, --uninstall', 'Uninstall legacy system')
  .action(handleLegacy);

if (process.argv.length === 2) {
  program.help();
}

program.parse();
