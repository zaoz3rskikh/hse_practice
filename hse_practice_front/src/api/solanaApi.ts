import axios from 'axios';
import { ResponseGeneric } from 'shared/types';

export type SolanaBalance = {
  usdt: number;
  usdc: number;
};

type TransactionFlow = {
  flow_id: number;
  summary: {
    initial: {
      token_mint: string;
      amount: string;
    };
    result: {
      token_mint: string;
      amount: string;
    };
  };
  detailed: {
    from_addres: string;
    to_address: string;
    token_mint: string;
    amount: string;
    authority: string;
  }[];
};

export type SolanaTransactionInfo = {
  err: any;
  info: TransactionFlow[] | ShortTransactionInfo;
};

type ShortTransactionInfo = {
  from_address: string;
  to_address: string;
  amount: number;
  token: string;
};

export const getSolanaBalance = async (
  wallet: string
): Promise<SolanaBalance> => {
  const res = await axios.get<ResponseGeneric<SolanaBalance>>(
    `http://localhost:3000/api/v1/solana/balance/${wallet}`
  );

  return res.data.data;
};

export const getSolanaTransactionHashes = async (
  wallet: string
): Promise<string[]> => {
  const res = await axios.get<ResponseGeneric<string[]>>(
    `http://localhost:3000/api/v1/solana/transactions/${wallet}`
  );

  return res.data.data;
};

export const getSolanaTransactionInfo = async (
  hash: string
): Promise<SolanaTransactionInfo> => {
  const res = await axios.get<ResponseGeneric<SolanaTransactionInfo>>(
    `http://localhost:3000/api/v1/solana/transaction/${hash}`
  );

  return res.data.data;
};
