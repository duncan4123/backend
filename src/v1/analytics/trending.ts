private async getTrending(deployment: Deployment): Promise<any> {
    const totalTradeCountQuery = this.strategy.query(`
      SELECT 
          COUNT(*)::INT AS trade_count
      FROM "strategy-updated-events"
      WHERE "blockchainType" = '${deployment.blockchainType}'
      AND "exchangeId" = '${deployment.exchangeId}'
      AND "reason" = 1
    `);

    const tradeCountQuery = this.strategy.query(`
      WITH strategy_trade_24hcounts AS (
          SELECT 
              s."blockchainType" AS "blockchainType", 
              s."exchangeId" AS "exchangeId", 
              s."strategyId" AS id, 
              COUNT(s.*)::INT AS strategy_trades_24h
          FROM "strategy-updated-events" s
          WHERE s."timestamp" >= NOW() - INTERVAL '24 HOURS'
          AND s."blockchainType" = '${deployment.blockchainType}'
          AND s."exchangeId" = '${deployment.exchangeId}'
          AND s."reason" = 1
          GROUP BY 1, 2, 3   
      ),
      strategy_trade_counts AS (
          SELECT 
              s."blockchainType"::TEXT AS "blockchainType", 
              s."exchangeId"::TEXT AS "exchangeId", 
              s."strategyId" AS id, 
              COUNT(s.*)::INT AS strategy_trades
          FROM "strategy-updated-events" s
          WHERE s."blockchainType" = '${deployment.blockchainType}'
          AND s."exchangeId" = '${deployment.exchangeId}'
          AND s."reason" = 1
          GROUP BY 1, 2, 3   
      )
      SELECT 
          stc.id, 
          stc.strategy_trades, 
          COALESCE(sc24.strategy_trades_24h, 0) AS strategy_trades_24h, 
          t0.address AS token0, 
          t1.address AS token1, 
          t0.symbol AS symbol0, 
          t1.symbol AS symbol1, 
          t0.symbol || '/' || t1.symbol AS pair_symbol,
          t0.address || '/' || t1.address AS pair_addresses
      FROM strategy_trade_counts stc
      LEFT JOIN "strategy-created-events" s 
          ON s."strategyId" = stc.id 
      AND s."blockchainType"::TEXT = stc."blockchainType"::TEXT 
      AND s."exchangeId"::TEXT = stc."exchangeId"::TEXT
      LEFT JOIN tokens t0 
          ON t0.id = s."token0Id" 
      AND t0."blockchainType"::TEXT = stc."blockchainType"::TEXT 
      AND t0."exchangeId"::TEXT = stc."exchangeId"::TEXT
      LEFT JOIN tokens t1 
          ON t1.id = s."token1Id" 
      AND t1."blockchainType"::TEXT = stc."blockchainType"::TEXT 
      AND t1."exchangeId"::TEXT = stc."exchangeId"::TEXT
      LEFT JOIN strategy_trade_24hcounts sc24 
          ON sc24.id = stc.id 
      AND sc24."blockchainType" = stc."blockchainType"
      AND sc24."exchangeId" = stc."exchangeId"
      ORDER BY 2 DESC; 
    `);

    const pairCountQuery = this.strategy.query(`
      WITH pair_trade_24hcounts AS (
          SELECT 
              s."blockchainType" AS "blockchainType", 
              s."exchangeId" AS "exchangeId", 
              s."pairId" AS pair_id, 
              COUNT(s.*)::INT AS pair_trades_24h
          FROM "strategy-updated-events" s
          WHERE s."timestamp" >= NOW() - INTERVAL '24 HOURS'
          AND s."blockchainType" = '${deployment.blockchainType}'
          AND s."exchangeId" = '${deployment.exchangeId}'
          AND s."reason" = 1
          GROUP BY 1, 2, 3
      ),
      pair_counts AS (
          SELECT 
              s."blockchainType" AS "blockchainType", 
              s."exchangeId" AS "exchangeId", 
              s."pairId" AS pair_id, 
              COUNT(s.*)::INT AS pair_trades
          FROM "strategy-updated-events" s
          WHERE s."blockchainType" = '${deployment.blockchainType}'
          AND s."exchangeId" = '${deployment.exchangeId}'
          AND s."reason" = 1
          GROUP BY 1, 2, 3
      )
      SELECT 
          p.pair_id, 
          p.pair_trades, 
          COALESCE(pc24.pair_trades_24h, 0) AS pair_trades_24h, 
          t0."address" as token0, 
          t1."address" as token1, 
          t0.symbol AS symbol0, 
          t1.symbol AS symbol1, 
          t0.symbol || '/' || t1.symbol AS pair_symbol,
          t0."address" || '/' || t1."address" AS pair_addresses
      FROM pair_counts p
      LEFT JOIN "pairs" pc 
          ON pc."id" = p.pair_id  
      AND pc."blockchainType"::TEXT = p."blockchainType"::TEXT
      AND pc."exchangeId"::TEXT = p."exchangeId"::TEXT
      LEFT JOIN tokens t0 
          ON t0.id = pc."token0Id" 
      AND t0."blockchainType"::TEXT = p."blockchainType"::TEXT
      AND t0."exchangeId"::TEXT = p."exchangeId"::TEXT
      LEFT JOIN tokens t1 
          ON t1.id = pc."token1Id" 
      AND t1."blockchainType"::TEXT = p."blockchainType"::TEXT
      AND t1."exchangeId"::TEXT = p."exchangeId"::TEXT
      LEFT JOIN pair_trade_24hcounts pc24 
          ON pc24.pair_id = p.pair_id
      AND pc24."blockchainType" = p."blockchainType"
      AND pc24."exchangeId" = p."exchangeId"
      ORDER BY p.pair_trades DESC;
    `);

    const [totalTradeCount, tradeCount, pairCount] = await Promise.all([
      totalTradeCountQuery,
      tradeCountQuery,
      pairCountQuery,
    ]);

    return convertKeysToCamelCase({ totalTradeCount: totalTradeCount[0].trade_count, tradeCount, pairCount });
  }