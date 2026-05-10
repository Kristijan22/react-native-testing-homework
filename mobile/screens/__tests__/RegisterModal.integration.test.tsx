import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import RegisterModal from '../RegisterModal';

const mockGoBack = jest.fn();
const mockRegisterToLotteries = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    goBack: mockGoBack,
  }),
  useRoute: () => ({
    params: {
      selectedLotteries: ['lottery-1', 'lottery-2'],
    },
  }),
}));

jest.mock('../../hooks/useLotteryRegister', () => ({
  __esModule: true,
  default: () => ({
    loading: false,
    error: undefined,
    registerToLotteries: mockRegisterToLotteries,
  }),
}));

describe('RegisterModal integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockRegisterToLotteries.mockResolvedValue(undefined);
  });

  it('submits entered name with selected lotteries and navigates back', async () => {
    const { getByTestId } = render(<RegisterModal />);

    fireEvent.changeText(getByTestId('register-name-input'), 'John');
    fireEvent.press(getByTestId('register-submit-button'));

    await waitFor(() => {
      expect(mockRegisterToLotteries).toHaveBeenCalledWith({
        name: 'John',
        lotteries: ['lottery-1', 'lottery-2'],
      });
    });

    expect(mockGoBack).toHaveBeenCalled();
  });
});
