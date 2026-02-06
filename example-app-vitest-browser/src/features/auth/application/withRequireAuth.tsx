import { Component, type ComponentType } from "react";

import { type IRequireAuthProps, RequireAuth } from "./RequireAuth";

export function withRequireAuth<Props>(
  Wrapper: ComponentType<Props>,
  props?: Omit<IRequireAuthProps, "children">
) {
  // eslint-disable-next-line react/display-name
  return class extends Component<Props> {
    render() {
      return (
        <RequireAuth to={props?.to}>
          <Wrapper {...this.props} />
        </RequireAuth>
      );
    }
  };
}
