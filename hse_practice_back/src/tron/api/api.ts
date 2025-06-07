import {
  TRON_BALANCE_DIVIDER,
  TRON_USDT_CONTRACT,
  tronWeb,
} from 'src/tron/utils';
import axios, { AxiosResponse } from 'axios';

export const getTronBalance = async (addr: string) => {
  tronWeb.setAddress(TRON_USDT_CONTRACT);

  const { abi } = await tronWeb.trx.getContract(TRON_USDT_CONTRACT);
  const usdtContract = tronWeb.contract(abi.entrys, TRON_USDT_CONTRACT);
  const usdtBalace = (await usdtContract.methods
    .balanceOf(addr)
    .call()) as unknown as BigInt;

  const trxBalance = await tronWeb.trx.getBalance(addr);

  return {
    usdt: Number(usdtBalace.toString()) / TRON_BALANCE_DIVIDER,
    trx: trxBalance / TRON_BALANCE_DIVIDER,
  };
};

export type TronTransactionInfo = {
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
};

export const getTransactionHistory = async (
  wallet: string,
  token: string,
  minTimestamp: number = 0
): Promise<TronTransactionInfo[]> => {
  const res: AxiosResponse<{ data: TronTransactionInfo[] }> = await axios.get<{
    data: TronTransactionInfo[];
  }>(
    `https://api.trongrid.io/v1/accounts/${wallet}/transactions/trc20?&contract_address=${token}&min_timestamp=${minTimestamp}`
  );

  return res.data.data;
};
