import { Container } from 'inversify';
import React, { PropsWithChildren } from 'react';

export const InversifyContext = React.createContext<{ container: Container | null }>({ container: null });

interface IProps {
  container: Container;
}

export const InversifyProvider: React.FC<PropsWithChildren<IProps>> = (props) => {
  return (
    <InversifyContext.Provider value={{ container: props.container }}>
      {props.children}
    </InversifyContext.Provider>
  )
}

