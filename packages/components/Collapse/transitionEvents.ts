import type { BaseTransitionProps } from "vue";

type Events = Pick<
  BaseTransitionProps,
  | "onBeforeEnter"
  | "onEnter"
  | "onAfterEnter"
  | "onBeforeLeave"
  | "onLeave"
  | "onAfterLeave"
>;

type FnWithOnlyOneArg<T extends (...args: any[]) => any> =
  Parameters<T> extends [infer One, ...infer _] ?
  (el: One) => ReturnType<T>
  : T;

const transitionEvents: {
  [k in keyof Events]-?: Exclude<Events[k], any[]>;
} & {
  onEnter: FnWithOnlyOneArg<Exclude<Events['onEnter'], any[] | undefined>>;
  onLeave: FnWithOnlyOneArg<Exclude<Events['onLeave'], any[] | undefined>>;
} = {
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
