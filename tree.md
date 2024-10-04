src
├── abis
│  ├── erc20.abi.ts
│  └── multicall.abi.ts
├── activity
│  ├── activity.entity.ts
│  ├── activity.module.ts
│  └── activity.service.ts
├── block
│  ├── block.entity.ts
│  ├── block.module.ts
│  ├── block.service.spec.ts
│  └── block.service.ts
├── coingecko
├── coinmarketcap
│  ├── coinmarketcap.module.ts
│  └── coinmarketcap.service.ts
├── contracts
│  ├── blast
│  │  ├── CarbonController.json
│  │  ├── CarbonController_Implementation.json
│  │  ├── CarbonController_Proxy.json
│  │  ├── ProxyAdmin.json
│  │  ├── Voucher.json
│  │  ├── Voucher_Implementation.json
│  │  └── Voucher_Proxy.json
│  ├── celo
│  │  ├── CarbonController.json
│  │  ├── CarbonController_Implementation.json
│  │  ├── CarbonController_Proxy.json
│  │  ├── ProxyAdmin.json
│  │  ├── Voucher.json
│  │  ├── Voucher_Implementation.json
│  │  └── Voucher_Proxy.json
│  ├── ethereum
│  │  ├── CarbonController.json
│  │  ├── CarbonController_Implementation.json
│  │  ├── CarbonController_Proxy.json
│  │  ├── CarbonPOL.json
│  │  ├── CarbonPOL_Implementation.json
│  │  ├── CarbonPOL_Proxy.json
│  │  ├── CarbonVortex.json
│  │  ├── CarbonVortex_Implementation.json
│  │  ├── CarbonVortex_Proxy.json
│  │  ├── ProxyAdmin.json
│  │  ├── Voucher.json
│  │  ├── Voucher_Implementation.json
│  │  └── Voucher_Proxy.json
│  └── sei
│     ├── CarbonController.json
│     ├── CarbonController_Implementation.json
│     ├── CarbonController_Proxy.json
│     ├── ProxyAdmin.json
│     ├── Voucher.json
│     ├── Voucher_Implementation.json
│     └── Voucher_Proxy.json
├── deployment
│  ├── deployment.module.ts
│  └── deployment.service.ts
├── events
│  ├── pair-created-event
│  │  ├── pair-created-event.entity.ts
│  │  ├── pair-created-event.module.ts
│  │  └── pair-created-event.service.ts
│  ├── pair-trading-fee-ppm-updated-event
│  │  ├── pair-trading-fee-ppm-updated-event.entity.ts
│  │  ├── pair-trading-fee-ppm-updated-event.module.ts
│  │  └── pair-trading-fee-ppm-updated-event.service.ts
│  ├── strategy-created-event
│  │  ├── strategy-created-event.entity.ts
│  │  ├── strategy-created-event.module.ts
│  │  └── strategy-created-event.service.ts
│  ├── strategy-deleted-event
│  │  ├── strategy-deleted-event.entity.ts
│  │  ├── strategy-deleted-event.module.ts
│  │  └── strategy-deleted-event.service.ts
│  ├── strategy-updated-event
│  │  ├── strategy-updated-event.entity.ts
│  │  ├── strategy-updated-event.module.ts
│  │  └── strategy-updated-event.service.ts
│  ├── tokens-traded-event
│  │  ├── tokens-traded-event.entity.ts
│  │  ├── tokens-traded-event.module.ts
│  │  └── tokens-traded-event.service.ts
│  ├── trading-fee-ppm-updated-event
│  │  ├── trading-fee-ppm-updated-event.entity.ts
│  │  ├── trading-fee-ppm-updated-event.module.ts
│  │  └── trading-fee-ppm-updated-event.service.ts
│  └── voucher-transfer-event
│     ├── voucher-transfer-event.entity.ts
│     ├── voucher-transfer-event.module.ts
│     └── voucher-transfer-event.service.ts
├── harvester
│  ├── harvester.module.ts
│  ├── harvester.service.spec.ts
│  └── harvester.service.ts
├── historic-quote
│  ├── historic-quote.controller.ts
│  ├── historic-quote.dto.ts
│  ├── historic-quote.entity.ts
│  ├── historic-quote.module.ts
│  ├── historic-quote.service.ts
│  └── mock-data.service.ts
├── last-processed-block
│  ├── last-processed-block.entity.ts
│  ├── last-processed-block.module.ts
│  └── last-processed-block.service.ts
├── migrations
│  ├── 1725540816542-seed.ts
│  ├── 1725543695390-addIndexesToHistoryQuotes.ts
│  ├── 1725887471388-storeUsdValuesOnTvl.ts
│  ├── 1725975485568-addSymbolIndexToTvl.ts
│  ├── 1725977797719-volumeRefactor.ts
│  ├── 1725977854109-hyperVolume.ts
│  ├── 1725978969873-volumeAllowNullFeeUsd.ts
│  ├── 1726507079926-removeUsdFromTvl.ts
│  ├── 1726576901633-addIndexBlockToTvl.ts
│  ├── 1726683511863-addTotalTvlTable.ts
│  └── 1727095200919-hyperTokensTraded.ts
├── pair
│  ├── index.dto.ts
│  ├── pair.controller.ts
│  ├── pair.entity.ts
│  ├── pair.module.ts
│  └── pair.service.ts
├── quote
│  ├── coingecko.service.ts
│  ├── quote.entity.ts
│  ├── quote.module.ts
│  └── quote.service.ts
├── redis
│  ├── redis.module.ts
│  └── redis.provider.ts
├── simulator
│  ├── core
│  │  ├── logger.py
│  │  └── __init__.py
│  ├── core_org
│  │  └── __init__.py
│  ├── example_config.json
│  ├── example_output.json
│  ├── legacy_config.json
│  ├── legacy_output.json
│  ├── README.md
│  ├── requirements.txt
│  ├── run.py
│  ├── run_org.py
│  └── test.py
├── strategy
│  ├── strategy.entity.ts
│  ├── strategy.module.ts
│  └── strategy.service.ts
├── token
│  ├── token.entity.ts
│  ├── token.module.ts
│  └── token.service.ts
├── tvl
│  ├── total-tvl.entity.ts
│  ├── tvl.entity.ts
│  ├── tvl.module.ts
│  └── tvl.service.ts
├── updater
│  ├── updater.module.ts
│  └── updater.service.ts
├── v1
│  ├── activity
│  │  ├── activity-meta.dto.ts
│  │  ├── activity.controller.ts
│  │  ├── activity.dto.ts
│  │  └── activity.module.ts
│  ├── analytics
│  │  ├── analytics.controller.ts
│  │  ├── analytics.module.ts
│  │  ├── analytics.service.ts
│  │  ├── tvl.pairs.dto.ts
│  │  ├── tvl.tokens.dto.ts
│  │  ├── tvl.total.dto.ts
│  │  ├── volume.pairs.dto.ts
│  │  ├── volume.tokens.dto.ts
│  │  └── volume.total.dto.ts
│  ├── cmc
│  │  ├── cmc.controller.ts
│  │  ├── cmc.module.ts
│  │  └── historical_trades.dto.ts
│  ├── coingecko
│  │  ├── coingecko.controller.ts
│  │  ├── coingecko.module.ts
│  │  ├── coingecko.service.ts
│  │  ├── historical_trades.dto.ts
│  │  └── ticker_id.validator.ts
│  ├── dex-screener
│  │  ├── asset.dto.ts
│  │  ├── dex-screener.controller.ts
│  │  ├── dex-screener.module.ts
│  │  ├── dex-screener.service.ts
│  │  ├── event.dto.ts
│  │  └── pair.dto.ts
│  ├── market-rate
│  │  ├── market-rate.controller.ts
│  │  ├── market-rate.dto.ts
│  │  └── market-rate.module.ts
│  ├── mocks
│  │  ├── agt-usdc-mock-data.json
│  │  ├── mock-dunks.ts
│  │  └── weth-usdc-mock-data.json
│  ├── roi
│  │  ├── roi.controller.ts
│  │  ├── roi.module.ts
│  │  └── roi.service.ts
│  ├── simulator
│  │  ├── simulator.controller.ts
│  │  ├── simulator.dto.ts
│  │  ├── simulator.module.ts
│  │  └── simulator.service.ts
│  ├── v1.controller.ts
│  └── v1.module.ts
├── volume
│  ├── volume.module.ts
│  └── volume.service.ts
├── .DS_Store
├── app.module.ts
├── exchange-id-param.decorator.ts
├── isAddress.validator.ts
├── logging.middleware.ts
├── main.ts
├── typeorm.config.ts
└── utilities.ts
