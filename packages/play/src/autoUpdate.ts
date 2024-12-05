const DURATION = 5 * 60 * 1000;
let lastSrcs: string[] = []; // 上一次获取到的地址(script标签)
const scriptReg = /<script.*src=["'](?<src>[^"']+)/gm;

async function extractScriptSrcs() {
  scriptReg.lastIndex = 0;
  let htmlText = "";
  let result: string[] = [];

  try {
    const htmlRes = await fetch("/?_timestamp=" + Date.now());
    htmlText = await htmlRes.text();

    let match = scriptReg.exec(htmlText);
    while (match) {
      if (match.groups) {
        result.push(match.groups.src);
      }

      match = scriptReg.exec(htmlText);
    }

    return [...new Set(result)];
  } catch (error) {
    console.log("HTML 请求失败: ", error);
    return [];
  }
}

async function needUpdate() {
  const scriptSrcs = await extractScriptSrcs();

  if (scriptSrcs.length === 0) {
    // 说明 请求失败，直接返回 false
    return false;
  }

  if (lastSrcs.length === 0) {
    lastSrcs = scriptSrcs;
    return false;
  }

  if (lastSrcs.length !== scriptSrcs.length) {
    return true;
  }

  let result = false;
  for (let i = 0; i < lastSrcs.length; i++) {
    if (lastSrcs[i] !== scriptSrcs[i]) {
      result = true;
      break;
    }
  }

  if (result) {
    lastSrcs = scriptSrcs;
  }

  return result;
}

/**
 *
 * @param fn 回调函数(若返回true，终止轮询)
 * @param ms 轮询间隔时间(ms)
 */
function autoRefresh(
  fn: () => boolean | void, //
  ms: number = DURATION
) {
  setTimeout(async () => {
    const willUpdate = await needUpdate();
    if (willUpdate && typeof fn === "function") {
      // 执行回调逻辑。
      // 并且，若返回值为true，轮询终止
      if (fn()) return;
    }

    autoRefresh(fn, ms);
  }, ms);
}

export {
  autoRefresh, //
};
