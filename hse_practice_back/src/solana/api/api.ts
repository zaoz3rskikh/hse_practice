import { address, Signature } from '@solana/kit';
import { map } from 'lodash';
import {
  SOLANA_RPC,
  SOLANA_USDC_MINT,
  SOLANA_USDT_MINT,
} from 'src/solana/utils';
import { RawTransactionInfo } from 'src/solana/api/types';

export const getSolanaBalance = async (addr: string) => {
  const getUsdt = async () => {
    return SOLANA_RPC.getTokenAccountsByOwner(
      address(addr),
      { mint: address(SOLANA_USDT_MINT) },
      { encoding: 'jsonParsed' }
    ).send();
  };

  const getUsdc = async () => {
    return SOLANA_RPC.getTokenAccountsByOwner(
      address(addr),
      { mint: address(SOLANA_USDC_MINT) },
      { encoding: 'jsonParsed' }
    ).send();
  };

  const balance = await Promise.all([getUsdt(), getUsdc()]);

  return {
    usdt:
      balance?.[0]?.value?.[0]?.account?.data?.parsed?.info?.tokenAmount
        ?.uiAmount || null,
    usdc:
      balance?.[1]?.value?.[0]?.account?.data?.parsed?.info?.tokenAmount
        ?.uiAmount || null,
  };
};

export const getSolanaTransactions = async (
  addr: string,
  limit: number = 1000
): Promise<string[]> => {
  const transactions = await SOLANA_RPC.getSignaturesForAddress(address(addr), {
    limit: limit,
  }).send();

  return map(transactions, (t) => t.signature);
};

export const getSolanaTransactionInfo = async (
  hash: string
): Promise<RawTransactionInfo> => {
  return SOLANA_RPC.getTransaction(hash as Signature, {
    encoding: 'jsonParsed',
    maxSupportedTransactionVersion: 0,
  }).send() as unknown as RawTransactionInfo;
};
