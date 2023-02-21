import React from 'react';
import { KustomPageComponent } from '@/lib/kustom-client-sdk/types';

interface KustomComponentProps {
  component: KustomPageComponent<any>;
}

const kustomComponents = {
  ids: new Map(),
  keys: new Map(),
};

export const registerKustomComponent = (component: {
  id?: string;
  key?: string;
  Component: React.ComponentType<any>;
}) => {
  if (component.id) {
    kustomComponents.ids.set(component.id, component.Component);
  } else if (component.key) {
    kustomComponents.keys.set(component.key, component.Component);
  }
};

const KustomComponent = (props: KustomComponentProps) => {
  const { component } = props;

  const Component =
    kustomComponents.ids.get(component.id) ||
    kustomComponents.keys.get(component.type);

  if (!Component) {
    console.warn(
      `KustomComponent ${component.type}#${component.id} not supported`,
    );
    return null;
  }

  return <Component component={component} />;
};

export default KustomComponent;
