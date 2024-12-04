import { describe, expect, it } from "vitest";
import { defineComponent, createApp } from "vue";
import { mount } from "@vue/test-utils";
import { withInstallComponent, makeInstaller } from "../install";

const AppComp = defineComponent({
  setup() {
    return () => <div>app</div>;
  },
});

const compA = withInstallComponent(
  defineComponent({
    name: "CompA",
    setup() {
      return () => <div>compA</div>;
    },
  })
);

const compB = withInstallComponent(
  defineComponent({
    name: "CompB",
    setup() {
      return () => <div>compB</div>;
    },
  })
);

describe("install", () => {
  it("withInstall should be worked", () => {
    const wrapper = mount(() => <div id="app"></div>);
    const app = createApp(AppComp);

    app.use(compA).mount(wrapper.element);

    expect(compA.install).toBeDefined();
    expect(compB.install).toBeDefined();
    expect(app._context.components["CompA"]).toBeTruthy();
    expect(app._context.components["CompB"]).toBeFalsy();
  });

  it("makeInstaller should be worked", () => {
    const wrapper = mount(() => <div id="app"></div>);
    const app = createApp(AppComp);
    const installer = makeInstaller([compA, compB]);

    app.use(installer).mount(wrapper.element);

    expect(app._context.components["CompA"]).toBeTruthy();
    expect(app._context.components["CompB"]).toBeTruthy();
  });
});
