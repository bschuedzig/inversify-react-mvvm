import { render, screen } from '@testing-library/react';
import { Container } from 'inversify';
import React from 'react';
import { InversifyProvider, useVm, ViewModel } from '../src';

function TestComponent() {

  var vm = useVm(TestViewModel);

  return (
    <div>{vm.name}</div>
  )
}

class TestViewModel extends ViewModel {

  public name: string = "John Doe";

}

describe('useVm', () => {

  describe('resolve', () => {

    it('resolves ViewModel via container', () => {

      var container = new Container();
      container.bind(TestViewModel).toSelf();

      var Subject = () =>
        <InversifyProvider container={container}>
          <TestComponent />
        </InversifyProvider>

      render(<Subject />);

      expect(screen.queryByText('John Doe')).not.toBeNull();
    });

    it('will throw if no container was set', () => {

      // error would be displayed nonetheless, so mute it
      jest.spyOn(console, 'error').mockImplementation(() => { });

      expect(() => render(<TestComponent />))
        .toThrowError(/Cannot find container in context/);

      jest.resetAllMocks();
    });

    it('will throw if view model was not registered', () => {

      // error would be displayed nonetheless, so mute it
      jest.spyOn(console, 'error').mockImplementation(() => { });

      var container = new Container();

      var Subject = () =>
        <InversifyProvider container={container}>
          <TestComponent />
        </InversifyProvider>

      expect(() => render(<Subject />))
        .toThrowError(/No matching bindings found for serviceIdentifier: TestViewModel/);

      jest.resetAllMocks();
    });
  });

  describe('lifecycle', () => {

    it('fires onLoad', () => {

      var container = new Container();

      var vm = new TestViewModel();
      var onLoadSpy = jest.spyOn(vm, 'onLoad').mockImplementation(() => { });

      container.bind(TestViewModel).toConstantValue(vm);

      var Subject = () =>
        <InversifyProvider container={container}>
          <TestComponent />
        </InversifyProvider>

      render(<Subject />);

      expect(onLoadSpy.mock.calls).toHaveLength(1);
    });

    it('fires onLeave', () => {

      var container = new Container();

      var vm = new TestViewModel();
      var onLeaveSpy = jest.spyOn(vm, 'onLeave').mockImplementation(() => { });

      container.bind(TestViewModel).toConstantValue(vm);

      var Subject = () =>
        <InversifyProvider container={container}>
          <TestComponent />
        </InversifyProvider>

      const { unmount } = render(<Subject />);
      unmount();

      expect(onLeaveSpy.mock.calls).toHaveLength(1);
    });
  });
});

