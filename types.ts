
export interface TradeData {
  input: number;
  output: number;
  pnl: number;
}

export interface Trades {
  [dateKey: string]: TradeData;
}
