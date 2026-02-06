/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import type { ComponentClass, ComponentType } from "react";

/**
 * Enhances a React component by composing it with higher-order components.
 *
 * @param component - The base component to enhance.
 * @param higherOrderComponents - An array of HoCs to apply to the base component.
 * @returns A new component that includes the specified enhancements.
 */

type ComponentEnhancer<TInnerProps, TOutterProps> = (
  component: ComponentType<TInnerProps>
) => ComponentClass<TOutterProps>;

export function compose<TInnerProps, TOutterProps>(
  ...higherOrderComponents: Function[]
): ComponentEnhancer<TInnerProps, TOutterProps> {
  return higherOrderComponents.reduce(
    (composedComponent, nextEnhancer) =>
      (...componentProps: unknown[]) =>
        composedComponent(nextEnhancer(...componentProps)),
    (arg: unknown) => arg
  ) as ComponentEnhancer<TInnerProps, TOutterProps>;
}
