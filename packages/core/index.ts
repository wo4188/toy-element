import { makeInstaller } from '@toy-element/utils';
import components from './components';

const installer = makeInstaller(components);

export * from "@toy-element/components";
export default installer;