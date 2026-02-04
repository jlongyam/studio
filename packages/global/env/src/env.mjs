import envGlobal from "./envGlobal.mjs";

const browser = envGlobal.window !== undefined;
const worker = envGlobal.importScripts !== undefined;
const cli = (!browser && !worker)
const env = {
  browser: browser,
  worker: worker,
  cli: cli
};

export default env