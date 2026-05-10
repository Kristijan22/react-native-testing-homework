import React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react-native';
import Home from '../Home';

const mockNavigate = jest.fn();
const mockFetchLotteries = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
  useIsFocused: () => true,
}));

jest.mock('../../hooks/useLotteries', () => ({
  __esModule: true,
  default: () => ({
    data: [
      {
        id: 'lottery-1',
        name: 'Super Lotto',
        prize: '1000',
        type: 'simple',
        status: 'running',
      },
    ],
    loading: false,
    error: undefined,
    fetchLotteries: mockFetchLotteries,
  }),
}));

jest.mock('../../hooks/useAsyncStorage', () => ({
  __esModule: true,
  default: () => ({
    storedData: [],
    storeData: jest.fn(),
    getStoredData: jest.fn(),
  }),
}));

describe('Home integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('selects lottery and navigates to Register with selected ids', async () => {
    const { getByTestId } = render(<Home />);

    await act(async () => {
      fireEvent.press(getByTestId('lottery-item-lottery-1'));
    });
    await act(async () => {
      fireEvent.press(getByTestId('home-register-button'));
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('Register', {
        selectedLotteries: ['lottery-1'],
      });
      expect(mockFetchLotteries).toHaveBeenCalled();
    });
  });
});
