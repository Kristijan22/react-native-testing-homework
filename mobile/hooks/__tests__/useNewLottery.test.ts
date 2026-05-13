import { act, renderHook, waitFor } from '@testing-library/react-native';
import { useNewLottery } from '../useNewLottery';
import * as LotteryService from '../../services/lottery';

jest.mock('../../services/lottery', () => ({
  createNewLottery: jest.fn(),
}));

describe('useNewLottery', () => {
  const mockedCreateNewLottery = LotteryService.createNewLottery as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('sets created lottery in state on success', async () => {
    const lottery = {
      id: 'lottery-1',
      name: 'Super Lotto',
      prize: '1000',
      type: 'simple',
      status: 'running',
    };
    mockedCreateNewLottery.mockResolvedValue(lottery);

    const { result } = renderHook(() => useNewLottery());

    await act(async () => {
      await result.current.createNewLottery({ name: 'Super Lotto', prize: '1000' });
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeUndefined();
    expect(result.current.data).toEqual(lottery);
  });

  it('sets error state and rethrows on failure', async () => {
    mockedCreateNewLottery.mockRejectedValue(new Error('Network Error'));

    const { result } = renderHook(() => useNewLottery());
    let thrownError: Error | undefined;

    await act(async () => {
      try {
        await result.current.createNewLottery({ name: 'Super Lotto', prize: '1000' });
      } catch (error) {
        thrownError = error as Error;
      }
    });

    expect(thrownError?.message).toBe('Network Error');

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe('Network Error');
    });
  });
});
