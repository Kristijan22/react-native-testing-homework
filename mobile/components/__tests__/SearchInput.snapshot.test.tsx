import React from 'react';
import { render } from '@testing-library/react-native';
import SearchInput from '../SearchInput';

describe('SearchInput snapshot', () => {
  it('matches snapshot', () => {
    const { toJSON } = render(
      <SearchInput value="initial value" onSearch={jest.fn()} />,
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
