import { exec } from 'child_process';
import { promisify } from 'util';
const execPromise = promisify(exec);

async function execute(cmd, cb) {
  try {
    const { stdout, stderr } = await execPromise(cmd);
    if (stderr) {
      console.error(stderr);
    } else {
      await cb(stdout)
    }
  } catch (error) {
    console.error(error.message);;
  }
}
export default execute;