import { interfaces } from 'inversify';
import { useContext } from 'react';
import { InversifyContext } from './InversifyContext';

/**
 * get a reference from the di container
 */
export function useInjection<T>(identifier: interfaces.ServiceIdentifier<T>) {

  const { container } = useContext(InversifyContext);

  if (!container) { throw new Error('No container provided by context'); }

  return container.get<T>(identifier);
};
