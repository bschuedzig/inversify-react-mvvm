import { render, screen } from '@testing-library/react';
import { Container } from 'inversify';
import React from 'react';
import { InversifyProvider, useContainer } from '../src';

function NameComponent() {

  var container = useContainer();
  var name = container.get<string>("name");

  return (
    <div>{name}</div>
  )
}

describe('useContainer', () => {

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
      .toThrowError(/Cannot find container/);

    jest.resetAllMocks();
  });
});
