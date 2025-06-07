import axios from 'axios';
import { ResponseGeneric } from 'shared/types';

export type TronBalance = {
  usdt: number;
  trx: number;
};

export const getTronBalance = async (wallet: string): Promise<TronBalance> => {
  const res = await axios.get<ResponseGeneric<TronBalance>>(
    `http://localhost:3000/api/v1/tron/balance/${wallet}`
  );

  return res.data.data;
};

export interface TronTransaction {
  transaction_id: string;
  token_info: {
    symbol: string;
    address: string;
    decimals: number;
    name: string;
  };
  block_timestamp: number;
  from: string;
  to: string;
  type: string;
  value: string;
}

export const getTronTransactions = async (
  wallet: string
): Promise<TronTransaction[]> => {
  const res = await axios.get<
    ResponseGeneric<{ transactions: TronTransaction[] }>
  >(`http://localhost:3000/api/v1/tron/transactions/${wallet}`);

  return res.data.data.transactions;
};
