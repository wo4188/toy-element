/** 用于 vue plugin 安装的一系列操作 */

import type { App, Plugin } from 'vue';
import { each } from 'lodash-es';

/** 
 * 插件款组件——可以作为 vue 插件安装的组件类型
 * 
 * @template T vue 组件对象类型
 * 
 * @note
 * "插件": 一个拥有 install 方法的对象，或者安装函数本身。
 */
type SFCWithInstall<T> = T & Plugin;

/**
 * 插件安装器，用于批量安装插件
 * 
 * @param plugins 待安装的插件
 * @returns 生成的插件安装函数
 * 
 * @example
 * // 批量注册全局组件
 * const installer = makeInstaller(components);
 * app.use(installer);
 */
export function makeInstaller(plugins: Plugin[]) {
  const installer: Plugin = (app: App) => {
    each(plugins, (plugin) => {
      app.use(plugin);
    })
  }

  return installer;
}

/**
 * 把组件改造为插件形式，用于注册全局组件
 *
 * @param comp vue 组件对象
 * @returns 装饰后的插件款组件
 * 
 * @example 
 * const ToyButton = withInstallComponent(Button);
 */
export const withInstallComponent = <T>(comp: T) => {
  (comp as SFCWithInstall<T>).install = (app: App) => {
    const name = (comp as any)?.name || "UnamedComponent";
    app.component(name, comp as SFCWithInstall<T>);
  };

  return comp as SFCWithInstall<T>;
}