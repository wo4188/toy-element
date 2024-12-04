import { describe, expect, it } from "vitest";
import {
  echoWarn,
  throwError,
  withInstallComponent,
  typeIconMap,
} from "../";
import { each } from "lodash-es";

describe("utils/index", () => {
  it("echoWarn should be exported", () => {
    expect(echoWarn).toBeDefined();
  });
  it("throwError should be exported", () => {
    expect(throwError).toBeDefined();
  });
  it("withInstallComponent should be exported", () => {
    expect(withInstallComponent).toBeDefined();
  });
  it("typeIconMap should be worked", () => {
    expect(typeIconMap).toBeDefined();
    each(
      [
        ["info", "circle-info"],
        ["success", "check-circle"],
        ["warning", "circle-exclamation"],
        ["danger", "circle-xmark"],
        ["error", "circle-xmark"],
      ],
      ([type, icon]) => {
        expect(typeIconMap.get(type)).toBe(icon);
      }
    );
  });
});
