#!/usr/bin/env node

import config from "../package.json" with { type: 'json' }
import { Command } from "commander"
import task from 'tasuku'

const program = new Command()

async function handleLegacy(options) {
  if (options.install) {
    await task('Installing Node v5.12.0', async ({setStatus})=> {
      const install = await import('../src/legacy/install.js')
      await install.createStudio()
      await install.createArchive()
      await install.downloadNode()
      await install.createLegacy()
      await install.extractNode()
      await install.legalizeNode()
      await install.nodeDone()
      setStatus('legacy')
    })
  }
  else if (options.run) {
    console.log('Running legacy system...');
  }
  else if (options.build) {
    console.log('Building legacy components...');
  }
  else if (options.uninstall) {
    await task('Uninstalling legacy SDK', async ({setStatus})=> {
      const uninstall = await import('../src/legacy/uninstall.js')
      await uninstall.cleanDirectory('legacy')
      setStatus('legacy')
    })
  }
  else if (options.clean) {
    await task('Clean legacy archive and SDK', async ({setStatus})=> {
      const uninstall = await import('../src/legacy/uninstall.js')
      await uninstall.cleanDirectory('legacy')
      await uninstall.cleanDirectory('archive')
      setStatus('legacy & archive')
    })
  }
  else {
    program.commands
      .find(cmd => cmd.name() === 'legacy')
      .help()
  }
}

program
  .name('jl-studio')
  .description('A CLI tool for studio SDK')
  .version(config.version, '-v, --version', 'Display version');

program
  .command('help')
  .description('Show help')
  .action(() => {
    program.help();
  });

program
  .command('legacy')
  .description('Development using legacy SDK: Node v5.12.0 & NW v0.14.7')
  .option('-i, --install', 'Install legacy SDK')
  .option('-r, --run', 'Run legacy SDK')
  .option('-b, --build', 'Build legacy NW')
  .option('-u, --uninstall', 'Uninstall legacy sdk')
  .option('-c, --clean', 'Clean all legacy foleder')
  .action(handleLegacy);

if (process.argv.length === 2) {
  program.help();
}

program.parse();
