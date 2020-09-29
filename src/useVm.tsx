import { useEffect, useRef } from 'react';
import { useContainer } from './useContainer';
import { ViewModel } from './ViewModel';

/**
 * Get a view model from the di container
 * This method also attaches onLoad/onLeave handlers
 */
export function useVm<TViewModel extends ViewModel>(ctor: Ctor<TViewModel>): TViewModel {

  // we are using useRef to make sure that we only have once instance
  var vmRef = (useRef(null) as any as React.MutableRefObject<TViewModel>);
  var container = useContainer();

  // check if we have an instance already, otherwise get it from the DI
  if (!vmRef.current) {
    vmRef.current = container.get(ctor);
  }

  // give the view model the chance to use hooks as well
  vmRef.current._bind();

  useEffect(() => {
    // trigger onLoad initially
    vmRef.current.onLoad();

    // and add a onLeave event handler
    return vmRef.current.onLeave;
  }, [vmRef]);

  return vmRef.current;
}
