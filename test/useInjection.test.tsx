import { render, screen } from '@testing-library/react';
import { Container } from 'inversify';
import React from 'react';
import { InversifyProvider, useInjection } from '../src';

function NameComponent() {

  var name = useInjection<string>("name");

  return (
    <div>{name}</div>
  )
}

describe('useInjection', () => {

  it('resolves reference to context container', () => {

    var container = new Container();
    container.bind("name").toConstantValue("John Doe");

    var Subject = () =>
      <InversifyProvider container={container}>
        <NameComponent />
      </InversifyProvider>;

    render(<Subject />);

    expect(screen.queryByText('John Doe')).not.toBeNull();
  });

  it('will throw if no container was set', () => {

    // error would be displayed nonetheless, so mute it
    jest.spyOn(console, 'error').mockImplementation(() => { });

    expect(() => render(<NameComponent />))
      .toThrowError(/No container provided by context/);

    jest.resetAllMocks();
  });

  it('will throw if requested identifier was not found', () => {

    // error would be displayed nonetheless, so mute it
    jest.spyOn(console, 'error').mockImplementation(() => { });

    var container = new Container();

    var Subject = () =>
      <InversifyProvider container={container}>
        <NameComponent />
      </InversifyProvider>;

    expect(() => render(<Subject />))
      .toThrowError(/No matching bindings found for serviceIdentifier: name/);

    jest.resetAllMocks();
  });
});
