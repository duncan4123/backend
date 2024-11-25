export interface DefiLlamaTokenPrice {
  coins: {
    [key: string]: {
      decimals: number;
      price: number;
      symbol: string;
      timestamp: number;
      confidence: number;
    };
  };
}
