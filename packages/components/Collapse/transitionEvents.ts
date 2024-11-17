import type { BaseTransitionProps } from "vue";

const transitionEvents: Pick<
  BaseTransitionProps,
  | "onBeforeEnter"
  | "onEnter"
  | "onAfterEnter"
  | "onBeforeLeave"
  | "onLeave"
  | "onAfterLeave"
> = {
  onBeforeEnter(el) {
    const _el = el as HTMLElement;
    _el.style.height = `${0}px`;
    _el.style.overflow = "hidden";
  },
  onEnter(el) {
    const _el = el as HTMLElement;
    _el.style.height = "auto";
    const _h = _el.clientHeight;
    _el.style.height = `${0}px`;
    _el.clientHeight;

    _el.style.height = `${_h}px`;
  },
  onAfterEnter(el) {
    const _el = el as HTMLElement;
    _el.style.height = "auto";
    _el.style.overflow = "unset";
  },
  onBeforeLeave(el) {
    const _el = el as HTMLElement;
    _el.style.height = `${_el.clientHeight}px`;
    _el.style.overflow = "hidden";
  },
  onLeave(el) {
    const _el = el as HTMLElement;
    _el.style.height = `${0}px`;
  },
  onAfterLeave(el) {
    const _el = el as HTMLElement;
    _el.style.height = "auto";
    _el.style.overflow = "unset";
  },
};

export default transitionEvents;
