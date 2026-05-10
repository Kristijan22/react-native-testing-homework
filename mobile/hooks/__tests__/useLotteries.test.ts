import { renderHook, waitFor } from '@testing-library/react-native';
import useLotteries from '../useLotteries';
import * as LotteryService from '../../services/lottery';

jest.mock('../../services/lottery', () => ({
  getLottieries: jest.fn(),
}));

describe('useLotteries', () => {
  const mockedGetLotteries = LotteryService.getLottieries as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('loads lotteries on mount', async () => {
    const lotteries = [
      {
        id: 'lottery-1',
        name: 'Super Lotto',
        prize: '1000',
        type: 'simple',
        status: 'running',
      },
    ];
    mockedGetLotteries.mockResolvedValue(lotteries);

    const { result } = renderHook(() => useLotteries());

    await waitFor(() => {
      expect(result.current.data).toEqual(lotteries);
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeUndefined();
    expect(mockedGetLotteries).toHaveBeenCalledTimes(1);
  });

  it('sets error when fetching lotteries fails', async () => {
    mockedGetLotteries.mockRejectedValue(new Error('Request failed'));

    const { result } = renderHook(() => useLotteries());

    await waitFor(() => {
      expect(result.current.error).toBe('Request failed');
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual([]);
  });
});
