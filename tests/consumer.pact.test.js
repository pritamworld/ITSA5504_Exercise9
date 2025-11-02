const path = require('path');
const axios = require('axios');
const { PactV3, MatchersV3 } = require('@pact-foundation/pact');
const { eachLike, integer, like, decimal } = MatchersV3;

describe('Pact with Orders API', () => {
  // Create a PactV3 provider (V3 spec is default)
  const provider = new PactV3({
    consumer: 'OrdersUI',
    provider: 'OrdersAPI',
    dir: path.resolve(process.cwd(), 'pacts'),
    log: path.resolve(process.cwd(), 'logs', 'pact.log'),
  });

  it('returns an array of orders', async () => {
    // Define the expected interaction
    provider
      .given('orders exist')
      .uponReceiving('a request for all orders')
      .withRequest({
        method: 'GET',
        path: '/orders',
        headers: { Accept: 'application/json' },
      })
      .willRespondWith({
        status: 200,
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: eachLike({
          id: integer(1),
          item: like('Notebook'),
          price: decimal(4.99),
        }),
      });

    // Pact V3 handles setup, mock server, verify, and finalize automatically
    await provider.executeTest(async (mockServer) => {
      const res = await axios.get(`${mockServer.url}/orders`, {
         headers: { Accept: 'application/json' } // ✅ Match Pact expectation
      });

      expect(res.status).toBe(200);
      expect(Array.isArray(res.data)).toBe(true);
      expect(res.data[0]).toHaveProperty('id');
      expect(typeof res.data[0].item).toBe('string');
      expect(typeof res.data[0].price).toBe('number');
    });
  });
});
