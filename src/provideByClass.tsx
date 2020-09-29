import { fluentProvide } from 'inversify-binding-decorators'

/**
 * The provide() helper from inversify cannot reference the underlying class
 * This is a workaround to register the class as itself
 */
export const provideByClass = () => {

  return (ctor: Ctor) => {

    return fluentProvide(ctor).inSingletonScope().done()(ctor);
  }
}
