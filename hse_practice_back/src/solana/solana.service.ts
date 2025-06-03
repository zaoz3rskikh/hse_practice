import { BadRequestException, Injectable } from '@nestjs/common';
import { BalanceDTO } from 'src/solana/dto/balanceDTO';
import {
  getSolanaBalance,
  getSolanaTransactions,
  getSolanaTransactionInfo,
} from 'src/solana/api/api';
import { parseDirect, parseInner } from 'src/solana/parsers/parser';
import {
  DetailedTransactionInfo,
  SimpleTransactionInfo,
  TransactionInfoWrapper,
} from 'src/solana/parsers/types';

@Injectable()
export class SolanaService {
  async getBalance(addr: string): Promise<BalanceDTO> {
    return getSolanaBalance(addr).catch((err) => {
      throw new BadRequestException(err);
    });
  }

  async getTransactions(addr: string): Promise<string[]> {
    return getSolanaTransactions(addr).catch((err) => {
      throw new BadRequestException(err);
    });
  }

  async getTransactionInfo(
    hash: string
  ): Promise<
    TransactionInfoWrapper<SimpleTransactionInfo | DetailedTransactionInfo>
  > {
    return getSolanaTransactionInfo(hash)
      .then((raw) => {
        if (raw.meta.innerInstructions?.length > 0) {
          return parseInner(raw);
        } else {
          return parseDirect(raw);
        }
      })
      .catch((err) => {
        throw new BadRequestException(err);
      });
  }
}
