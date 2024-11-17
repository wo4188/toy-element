import Collapse from './Collapse.vue';
import CollapseItem from './CollapseItem.vue';
import { withInstallComponent } from '@toy-view/utils';

export const ToyCollapse = withInstallComponent(Collapse);
export const ToyCollapseItem = withInstallComponent(CollapseItem);

export * from "./types";
