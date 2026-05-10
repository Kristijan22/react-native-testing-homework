jest.mock(
  '@env',
  () => ({
    API_URL_IOS: 'http://localhost:3000',
    API_URL_ANDROID: 'http://10.0.2.2:3000',
  }),
  { virtual: true },
);

import { createNewLottery, getLottieries, registerToLottery } from '../lottery';

describe('lottery service', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('creates a new lottery and returns response body', async () => {
    const responseBody = {
      id: 'lottery-1',
      name: 'Super Lotto',
      prize: '1000',
      type: 'simple',
      status: 'running',
    };

    global.fetch = jest.fn().mockResolvedValue({
      json: async () => responseBody,
    } as Response);

    const result = await createNewLottery({ name: 'Super Lotto', prize: '1000' });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringMatching(/\/lotteries$/),
      expect.objectContaining({
        method: 'POST',
      }),
    );
    expect(result).toEqual(responseBody);
  });

  it('returns lottery list from getLottieries', async () => {
    const lotteries = [
      {
        id: 'lottery-1',
        name: 'Super Lotto',
        prize: '1000',
        type: 'simple',
        status: 'running',
      },
    ];

    global.fetch = jest.fn().mockResolvedValue({
      json: async () => lotteries,
    } as Response);

    const result = await getLottieries();

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringMatching(/\/lotteries$/),
    );
    expect(result).toEqual(lotteries);
  });

  it('throws when registerToLottery receives non-ok response', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      statusText: 'Bad Request',
    } as Response);

    await expect(
      registerToLottery({ name: 'John', lotteryId: 'lottery-1' }),
    ).rejects.toThrow('Bad Request');
  });
});
