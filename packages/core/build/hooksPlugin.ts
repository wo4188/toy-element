import { each, isFunction } from "lodash-es";
import shell from "shelljs";

type Params = {
  rmFiles?: string[];
  beforeBuild?: Function;
  afterBuild?: Function;
};

/**
 * 在构建过程中执行一些钩子函数
 * (事先删除原产物，后续执行其他操作)
 *
 * rollup 插件
 */
export default function hooksPlugin(opts: Params) {
  const {
    rmFiles = [], //
    beforeBuild,
    afterBuild,
  } = opts;

  return {
    name: "hooks-plugin",
    buildStart() {
      each(rmFiles, (fName) => shell.rm("-rf", fName));

      isFunction(beforeBuild) && beforeBuild();
    },
    buildEnd(err?: Error) {
      if (!err) {
        isFunction(afterBuild) && afterBuild();
      }
    },
  };
}
