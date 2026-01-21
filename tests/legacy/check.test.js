import check from '../../src/legacy/check.js';
import config from '../../src/legacy/config.js';
import fsx from 'fs-extra';
import { assert, describe, test, beforeEach, afterEach } from 'vitest';
import { assert } from 'chai';
const osx = config.target.location.osx;

describe('check module', () => {
  describe('target.location.osx()', () => {
    beforeEach(() => {
      if (fsx.pathExistsSync(osx)) {
        fsx.removeSync(osx);
      }
    });
    afterEach(() => {
      if (fsx.pathExistsSync(osx)) {
        fsx.removeSync(osx);
      }
    });
    test('should create directory if it does not exist', () => {
      assert.isFalse(fsx.pathExistsSync(osx), 'Directory should not exist before calling check');
      check.target.location.osx();
      assert.isTrue(fsx.pathExistsSync(osx), 'Directory should exist after calling check');
    });
    test('should not throw error if directory already exists', () => {
      fsx.mkdirsSync(osx);
      assert.isTrue(fsx.pathExistsSync(osx), 'Directory should exist before calling check');
      assert.doesNotThrow(() => {
        check.target.location.osx();
      }, 'Should not throw when directory already exists');
      assert.isTrue(fsx.pathExistsSync(osx), 'Directory should still exist after calling check');
    });
    test('should create nested directories if parent does not exist', () => {
      const parentDir = `${process.env.HOME}/.local/app`;
      if (fsx.pathExistsSync(parentDir)) {
        fsx.removeSync(parentDir);
      }
      assert.isFalse(fsx.pathExistsSync(osx), 'Directory should not exist before calling check');
      check.target.location.osx();
      assert.isTrue(fsx.pathExistsSync(osx), 'Directory should exist after calling check');
    });
  });
});
