import type { Plugin } from "vue";
import { describe, it, expect } from "vitest";
import {
  ToyAlert,
  ToyButton,
  ToyButtonGroup,
  ToyCollapse,
  ToyCollapseItem,
  ToyIcon,
} from "../index";
import { map, get } from "lodash-es";

const components = [
  ToyAlert,
  ToyButton,
  ToyButtonGroup,
  ToyCollapse,
  ToyCollapseItem,
  ToyIcon,
] as Plugin[];

describe("components/index.ts", () => {
  it.each(
    map(
      components, //
      (comp) => [get(comp, "name") ?? "UnamedComp", comp]
    )
  )(
    "%s should be exported", //
    (_, comp) => {
      expect(comp).toBeDefined();
      expect(comp.install).toBeDefined();
    }
  );
});
