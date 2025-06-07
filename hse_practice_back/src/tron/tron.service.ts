import { BadRequestException, Injectable } from '@nestjs/common';
import { BalanceDTO } from 'src/tron/dto/balanceDTO';
import { getTransactionHistory, getTronBalance } from 'src/tron/api/api';
import { TRON_TRX_CONTRACT, TRON_USDT_CONTRACT } from 'src/tron/utils';
import { TransactionsDTO } from 'src/tron/dto/transactionsDTO';
import { TronTransactionInfo } from 'src/tron/api/types';

@Injectable()
export class TronService {
  async getBalance(addr: string): Promise<BalanceDTO> {
    return getTronBalance(addr).catch((err) => {
      throw new BadRequestException(err);
    });
  }

  async getTransactionHistory(addr: string): Promise<TransactionsDTO> {
    const usdtTransactions: TronTransactionInfo[] = await getTransactionHistory(
      addr,
      TRON_USDT_CONTRACT
    ).catch((err) => {
      throw new BadRequestException(err);
    });

    const trxTransactions: TronTransactionInfo[] = await getTransactionHistory(
      addr,
      TRON_TRX_CONTRACT
    ).catch((err) => {
      throw new BadRequestException(err);
    });

    return {
      transactions: [...usdtTransactions, ...trxTransactions],
    };
  }
}
