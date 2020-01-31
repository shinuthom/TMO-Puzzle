/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/
import { Server } from 'hapi';
import { callStockAPI } from './app';
const CatboxMemory = require('@hapi/catbox-memory');
import { SERVER_CONST } from './server-const';

const init = async () => {
  const server = new Server({
    port: SERVER_CONST.SERVER_PORT,
    host: SERVER_CONST.SERVER_HOST,
    cache: [
      {
        name: SERVER_CONST.STOCK_CACHE,
        provider: {
          constructor: CatboxMemory,
          options: {
            partition: SERVER_CONST.STOCK_CACHED_DATA,
            host: SERVER_CONST.SERVER_HOST
          }
        }
      }
    ]
  });

  server.method(SERVER_CONST.GET_STOCK_DATA, callStockAPI, {
    cache: {
      cache: SERVER_CONST.STOCK_CACHE,
      expiresIn: SERVER_CONST.EXPIRE_TIME,
      generateTimeout: SERVER_CONST.CACHE_TIMEOUT
    }
  });

  server.route({
    method: 'GET',
    path: '/api/getPriceQuery/{symbol}/{period}',
    handler: async (request, h) => {
      const { symbol, period } = request.params;
      return await server.methods.getStockData(symbol, period);
    }
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
