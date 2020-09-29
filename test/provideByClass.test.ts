import { Container } from 'inversify';
import { buildProviderModule } from 'inversify-binding-decorators';
import { provideByClass } from '../src';

describe('provideByClass', () => {

  @provideByClass()
  class ExampleClass {

  }

  it('can be registered in Container via buildProviderModule()', () => {

    var provider = buildProviderModule();
    var container = new Container();

    container.load(provider);

    var instance = container.get(ExampleClass);
    expect(instance).toBeInstanceOf(ExampleClass);
  });

  it('registers classes as singletons', () => {
    var provider = buildProviderModule();
    var container = new Container();

    container.load(provider);

    var instance1 = container.get(ExampleClass);
    var instance2 = container.get(ExampleClass);

    expect(instance1).toBe(instance2);
  })
});
