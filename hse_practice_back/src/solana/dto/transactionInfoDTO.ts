import {
  DetailedTransactionInfo,
  SimpleTransactionInfo,
  TransactionInfoWrapper,
} from 'src/solana/parsers/types';

export type TransactionInfoDTO = TransactionInfoWrapper<
  SimpleTransactionInfo | DetailedTransactionInfo
>;
