export const CarbonVortex: any[] = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'previousAdmin',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'newAdmin',
        type: 'address',
      },
    ],
    name: 'AdminChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'beacon',
        type: 'address',
      },
    ],
    name: 'BeaconUpgraded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'implementation',
        type: 'address',
      },
    ],
    name: 'Upgraded',
    type: 'event',
  },
  {
    stateMutability: 'payable',
    type: 'fallback',
  },
  {
    inputs: [],
    name: 'admin',
    outputs: [
      {
        internalType: 'address',
        name: 'admin_',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'implementation',
    outputs: [
      {
        internalType: 'address',
        name: 'implementation_',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newImplementation',
        type: 'address',
      },
    ],
    name: 'upgradeTo',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newImplementation',
        type: 'address',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'upgradeToAndCall',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    stateMutability: 'payable',
    type: 'receive',
  },
  {
    inputs: [],
    name: 'AccessDenied',
    type: 'error',
  },
  {
    inputs: [],
    name: 'AlreadyInitialized',
    type: 'error',
  },
  {
    inputs: [],
    name: 'DuplicateToken',
    type: 'error',
  },
  {
    inputs: [],
    name: 'GreaterThanMaxInput',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InsufficientAmountForTrading',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InsufficientNativeTokenSent',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidAddress',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidAmountLength',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidFee',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidPrice',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidToken',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidTokenLength',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidTrade',
    type: 'error',
  },
  {
    inputs: [],
    name: 'Overflow',
    type: 'error',
  },
  {
    inputs: [],
    name: 'PairDisabled',
    type: 'error',
  },
  {
    inputs: [],
    name: 'TradingDisabled',
    type: 'error',
  },
  {
    inputs: [],
    name: 'UnnecessaryNativeTokenReceived',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ZeroValue',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address[]',
        name: 'tokens',
        type: 'address[]',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'target',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'amounts',
        type: 'uint256[]',
      },
    ],
    name: 'FundsWithdrawn',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint8',
        name: 'version',
        type: 'uint8',
      },
    ],
    name: 'Initialized',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint128',
        name: 'prevTargetTokenSaleAmount',
        type: 'uint128',
      },
      {
        indexed: false,
        internalType: 'uint128',
        name: 'newTargetTokenSaleAmount',
        type: 'uint128',
      },
    ],
    name: 'MaxTargetTokenSaleAmountUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint32',
        name: 'prevMinTokenSaleAmountMultiplier',
        type: 'uint32',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'newMinTokenSaleAmountMultiplier',
        type: 'uint32',
      },
    ],
    name: 'MinTokenSaleAmountMultiplierUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'Token',
        name: 'token',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint128',
        name: 'prevMinTokenSaleAmount',
        type: 'uint128',
      },
      {
        indexed: false,
        internalType: 'uint128',
        name: 'newMinTokenSaleAmount',
        type: 'uint128',
      },
    ],
    name: 'MinTokenSaleAmountUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'Token',
        name: 'token',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'prevStatus',
        type: 'bool',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'newStatus',
        type: 'bool',
      },
    ],
    name: 'PairDisabledStatusUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint32',
        name: 'prevPriceDecayHalfLife',
        type: 'uint32',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'newPriceDecayHalfLife',
        type: 'uint32',
      },
    ],
    name: 'PriceDecayHalfLifeUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint32',
        name: 'prevPriceResetMultiplier',
        type: 'uint32',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'newPriceResetMultiplier',
        type: 'uint32',
      },
    ],
    name: 'PriceResetMultiplierUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'Token',
        name: 'token',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'uint128',
            name: 'sourceAmount',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'targetAmount',
            type: 'uint128',
          },
        ],
        indexed: false,
        internalType: 'struct ICarbonVortex.Price',
        name: 'price',
        type: 'tuple',
      },
    ],
    name: 'PriceUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint32',
        name: 'prevRewardsPPM',
        type: 'uint32',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'newRewardsPPM',
        type: 'uint32',
      },
    ],
    name: 'RewardsUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'previousAdminRole',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'newAdminRole',
        type: 'bytes32',
      },
    ],
    name: 'RoleAdminChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'RoleGranted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'RoleRevoked',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint32',
        name: 'prevPriceDecayHalfLife',
        type: 'uint32',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'newPriceDecayHalfLife',
        type: 'uint32',
      },
    ],
    name: 'TargetTokenPriceDecayHalfLifeOnResetUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint32',
        name: 'prevPriceDecayHalfLife',
        type: 'uint32',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'newPriceDecayHalfLife',
        type: 'uint32',
      },
    ],
    name: 'TargetTokenPriceDecayHalfLifeUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'Token',
        name: 'token',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint128',
        name: 'sourceAmount',
        type: 'uint128',
      },
      {
        indexed: false,
        internalType: 'uint128',
        name: 'targetAmount',
        type: 'uint128',
      },
    ],
    name: 'TokenTraded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'Token',
        name: 'token',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'uint128',
            name: 'sourceAmount',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'targetAmount',
            type: 'uint128',
          },
        ],
        indexed: false,
        internalType: 'struct ICarbonVortex.Price',
        name: 'price',
        type: 'tuple',
      },
    ],
    name: 'TradingReset',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'prevTransferAddress',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newTransferAddress',
        type: 'address',
      },
    ],
    name: 'TransferAddressUpdated',
    type: 'event',
  },
  {
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'Token',
        name: 'token',
        type: 'address',
      },
    ],
    name: 'amountAvailableForTrading',
    outputs: [
      {
        internalType: 'uint128',
        name: '',
        type: 'uint128',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'Token',
        name: 'token',
        type: 'address',
      },
    ],
    name: 'availableTokens',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'Token',
        name: 'token',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'disabled',
        type: 'bool',
      },
    ],
    name: 'disablePair',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'Token[]',
        name: 'tokens',
        type: 'address[]',
      },
    ],
    name: 'execute',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'Token',
        name: 'token',
        type: 'address',
      },
      {
        internalType: 'uint128',
        name: 'targetAmount',
        type: 'uint128',
      },
    ],
    name: 'expectedTradeInput',
    outputs: [
      {
        internalType: 'uint128',
        name: '',
        type: 'uint128',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'Token',
        name: 'token',
        type: 'address',
      },
      {
        internalType: 'uint128',
        name: 'sourceAmount',
        type: 'uint128',
      },
    ],
    name: 'expectedTradeReturn',
    outputs: [
      {
        internalType: 'uint128',
        name: '',
        type: 'uint128',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'finalTargetToken',
    outputs: [
      {
        internalType: 'Token',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
    ],
    name: 'getRoleAdmin',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'index',
        type: 'uint256',
      },
    ],
    name: 'getRoleMember',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
    ],
    name: 'getRoleMemberCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'hasRole',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address payable',
        name: 'transferAddressInit',
        type: 'address',
      },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'minTargetTokenSaleAmount',
    outputs: [
      {
        internalType: 'uint128',
        name: '',
        type: 'uint128',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'Token',
        name: 'token',
        type: 'address',
      },
    ],
    name: 'minTokenSaleAmount',
    outputs: [
      {
        internalType: 'uint128',
        name: '',
        type: 'uint128',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'minTokenSaleAmountMultiplier',
    outputs: [
      {
        internalType: 'uint32',
        name: '',
        type: 'uint32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'Token',
        name: 'token',
        type: 'address',
      },
    ],
    name: 'pairDisabled',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bool',
        name: 'checkVersion',
        type: 'bool',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'postUpgrade',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'priceDecayHalfLife',
    outputs: [
      {
        internalType: 'uint32',
        name: '',
        type: 'uint32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'priceResetMultiplier',
    outputs: [
      {
        internalType: 'uint32',
        name: '',
        type: 'uint32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'rewardsPPM',
    outputs: [
      {
        internalType: 'uint32',
        name: '',
        type: 'uint32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'roleAdmin',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint128',
        name: 'newMaxTargetTokenSaleAmount',
        type: 'uint128',
      },
    ],
    name: 'setMaxTargetTokenSaleAmount',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint128',
        name: 'newMinTargetTokenSaleAmount',
        type: 'uint128',
      },
    ],
    name: 'setMinTargetTokenSaleAmount',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: 'newMinTokenSaleAmountMultiplier',
        type: 'uint32',
      },
    ],
    name: 'setMinTokenSaleAmountMultiplier',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: 'newPriceDecayHalfLife',
        type: 'uint32',
      },
    ],
    name: 'setPriceDecayHalfLife',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: 'newPriceResetMultiplier',
        type: 'uint32',
      },
    ],
    name: 'setPriceResetMultiplier',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: 'newRewardsPPM',
        type: 'uint32',
      },
    ],
    name: 'setRewardsPPM',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: 'newPriceDecayHalfLife',
        type: 'uint32',
      },
    ],
    name: 'setTargetTokenPriceDecayHalfLife',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: 'newPriceDecayHalfLife',
        type: 'uint32',
      },
    ],
    name: 'setTargetTokenPriceDecayHalfLifeOnReset',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newTransferAddress',
        type: 'address',
      },
    ],
    name: 'setTransferAddress',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4',
      },
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'targetToken',
    outputs: [
      {
        internalType: 'Token',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'targetTokenPriceDecayHalfLife',
    outputs: [
      {
        internalType: 'uint32',
        name: '',
        type: 'uint32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'targetTokenPriceDecayHalfLifeOnReset',
    outputs: [
      {
        internalType: 'uint32',
        name: '',
        type: 'uint32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'targetTokenSaleAmount',
    outputs: [
      {
        components: [
          {
            internalType: 'uint128',
            name: 'initial',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'current',
            type: 'uint128',
          },
        ],
        internalType: 'struct ICarbonVortex.SaleAmount',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'Token',
        name: 'token',
        type: 'address',
      },
    ],
    name: 'tokenPrice',
    outputs: [
      {
        components: [
          {
            internalType: 'uint128',
            name: 'sourceAmount',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'targetAmount',
            type: 'uint128',
          },
        ],
        internalType: 'struct ICarbonVortex.Price',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalCollected',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'Token',
        name: 'token',
        type: 'address',
      },
      {
        internalType: 'uint128',
        name: 'targetAmount',
        type: 'uint128',
      },
      {
        internalType: 'uint128',
        name: 'maxInput',
        type: 'uint128',
      },
    ],
    name: 'trade',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'Token',
        name: 'token',
        type: 'address',
      },
    ],
    name: 'tradingEnabled',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'transferAddress',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'version',
    outputs: [
      {
        internalType: 'uint16',
        name: '',
        type: 'uint16',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'Token[]',
        name: 'tokens',
        type: 'address[]',
      },
      {
        internalType: 'address payable',
        name: 'target',
        type: 'address',
      },
      {
        internalType: 'uint256[]',
        name: 'amounts',
        type: 'uint256[]',
      },
    ],
    name: 'withdrawFunds',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_logic',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'admin_',
        type: 'address',
      },
      {
        internalType: 'bytes',
        name: '_data',
        type: 'bytes',
      },
    ],
    stateMutability: 'payable',
    type: 'constructor',
  },
];
