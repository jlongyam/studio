import { promises as fs } from 'fs';
import path from 'path';

const folder = {
  async list(dirPath) {
    try {
      return await fs.readdir(dirPath);
    } catch (error) {
      throw new Error(`Failed to list directory: ${dirPath} - ${error.message}`);
    }
  },
  async stats(dirPath) {
    try {
      return await fs.stat(dirPath);
    } catch (error) {
      throw new Error(`Failed to get stats for directory: ${dirPath} - ${error.message}`);
    }
  },
  
  async create(dirPath, recursive = true) {
    try {
      await fs.mkdir(dirPath, { recursive });
    } catch (error) {
      throw new Error(`Failed to create directory: ${dirPath} - ${error.message}`);
    }
  },
  async exists(dirPath) {
    try {
      const stats = await fs.stat(dirPath);
      return stats.isDirectory();
    } catch {
      return false;
    }
  },
  async delete(dirPath, recursive = false) {
    try {
      if (recursive) {
        await fs.rm(dirPath, { recursive: true, force: true });
      } else {
        await fs.rmdir(dirPath);
      }
    } catch (error) {
      throw new Error(`Failed to delete directory: ${dirPath} - ${error.message}`);
    }
  },
  
  async listFull(dirPath) {
    try {
      const items = await fs.readdir(dirPath);
      return items.map(item => path.join(dirPath, item));
    } catch (error) {
      throw new Error(`Failed to list directory: ${dirPath} - ${error.message}`);
    }
  },
  async listFiles(dirPath) {
    try {
      const items = await fs.readdir(dirPath);
      const files = [];
      for (const item of items) {
        const fullPath = path.join(dirPath, item);
        const stats = await fs.stat(fullPath);
        if (stats.isFile()) {
          files.push(item);
        }
      }
      return files;
    } catch (error) {
      throw new Error(`Failed to list files in directory: ${dirPath} - ${error.message}`);
    }
  },
  async listDirs(dirPath) {
    try {
      const items = await fs.readdir(dirPath);
      const dirs = [];
      for (const item of items) {
        const fullPath = path.join(dirPath, item);
        const stats = await fs.stat(fullPath);
        if (stats.isDirectory()) {
          dirs.push(item);
        }
      }
      return dirs;
    } catch (error) {
      throw new Error(`Failed to list directories in: ${dirPath} - ${error.message}`);
    }
  },
  async copy(source, destination, recursive = true) {
    try {
      if (recursive) {
        await fs.cp(source, destination, { recursive: true });
      } else {
        await fs.mkdir(destination, { recursive: true });
      }
    } catch (error) {
      throw new Error(`Failed to copy directory from ${source} to ${destination} - ${error.message}`);
    }
  },
  async move(source, destination) {
    try {
      await fs.rename(source, destination);
    } catch (error) {
      throw new Error(`Failed to move directory from ${source} to ${destination} - ${error.message}`);
    }
  },
  /*
  async walk(dirPath, callback) {
    try {
      const items = await fs.readdir(dirPath);
      for (const item of items) {
        const fullPath = path.join(dirPath, item);
        const stats = await fs.stat(fullPath);
        if (stats.isDirectory()) {
          await this.walk(fullPath, callback);
        } else {
          await callback(fullPath, stats);
        }
      }
    } catch (error) {
      throw new Error(`Failed to walk directory: ${dirPath} - ${error.message}`);
    }
  },
  async getAllFiles(dirPath) {
    const files = [];
    await this.walk(dirPath, (filePath) => {
      files.push(filePath);
    });
    return files;
  },
  async getAllDirs(dirPath) {
    const dirs = [];
    const walk = async (currentPath) => {
      const items = await fs.readdir(currentPath);
      for (const item of items) {
        const fullPath = path.join(currentPath, item);
        const stats = await fs.stat(fullPath);
        if (stats.isDirectory()) {
          dirs.push(fullPath);
          await walk(fullPath);
        }
      }
    };
    await walk(dirPath);
    return dirs;
  }
  */
};
export default folder;
