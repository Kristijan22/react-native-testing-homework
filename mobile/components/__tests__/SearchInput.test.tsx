import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import SearchInput from '../SearchInput';

describe('SearchInput', () => {
  it('renders value and calls onSearch on text change', () => {
    const onSearch = jest.fn();
    const { getByDisplayValue, getByPlaceholderText } = render(
      <SearchInput value="initial" onSearch={onSearch} />,
    );

    expect(getByDisplayValue('initial')).toBeTruthy();

    fireEvent.changeText(getByPlaceholderText('Filter lotteries'), 'New lottery');

    expect(onSearch).toHaveBeenCalledWith('New lottery');
  });
});
