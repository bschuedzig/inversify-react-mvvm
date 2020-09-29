import { useContext } from 'react';
import { InversifyContext } from './InversifyContext';

/**
 * returns the current di container (based on context)
 */
export function useContainer() {
  const { container } = useContext(InversifyContext);

  if (container == null) {
    throw new Error('Cannot find container in context, did you forget to add InversifyProvider?');
  }
  return container;
}
