import { RawTransactionInfo } from 'src/solana/api/types';
import {
  DetailedTransactionInfo,
  SimpleTransactionInfo,
  TransactionInfoWrapper,
  TransferGroup,
} from 'src/solana/parsers/types';
import { find } from 'lodash';
import { SOLANA_LAMPORT_DIVIDER } from 'src/solana/utils';

export function parseInner(
  transaction: RawTransactionInfo
): TransactionInfoWrapper<DetailedTransactionInfo> {
  const innerInstructions = transaction.meta.innerInstructions;

  const transferGroups: TransferGroup[] = [];

  let id = 0;
  for (const group of innerInstructions) {
    transferGroups?.push({
      id: id,
      transfers: [],
    });

    for (const instr of group.instructions) {
      if (instr.parsed?.type === 'transferChecked') {
        const info = instr.parsed.info;
        const tokenAmount = info.tokenAmount;
        if (
          info.source &&
          info.destination &&
          info.mint &&
          tokenAmount?.amount &&
          tokenAmount?.decimals !== undefined
        ) {
          const decimals =
            typeof tokenAmount.decimals === 'string'
              ? parseInt(tokenAmount.decimals)
              : tokenAmount.decimals;
          const normalizedAmount = (
            Number(String(tokenAmount.amount)) / Math.pow(10, Number(decimals))
          ).toString();
          transferGroups?.[id]?.transfers.push({
            from_addres: info.source,
            to_address: info.destination,
            token_mint: info.mint,
            amount: normalizedAmount,
            authority: info.authority,
          });
        }
      }
    }

    id += 1;
  }

  const detailedInfo: DetailedTransactionInfo = transferGroups
    .filter((g) => g?.transfers?.length > 0)
    .map((g, i) => ({ ...g, id: i }))
    .map((gr, idx) => {
      let to = idx === 0 ? undefined : gr?.transfers?.[0];
      let from = idx !== 0 ? undefined : gr?.transfers?.[0];

      for (const transfer of gr.transfers) {
        const pair = find(
          gr.transfers,
          (t) =>
            t?.from_addres === transfer.from_addres &&
            t?.to_address !== transfer?.to_address
        );

        if (pair) {
          if (idx === 0) {
            to = pair?.amount > transfer?.amount ? pair : transfer;
          } else {
            from = pair?.amount > transfer?.amount ? pair : transfer;
          }
        }
      }

      if (!from || !to) {
        from = gr?.transfers?.[0];
        to = gr?.transfers?.[1];
      }

      return {
        flow_id: gr?.id,
        summary: {
          initial: {
            token_mint: from?.token_mint,
            amount: from?.amount,
          },
          result: {
            token_mint: to?.token_mint,
            amount: to?.amount,
          },
        },
        detailed: gr?.transfers?.map((t) => ({
          from_addres: t.from_addres,
          to_address: t.to_address,
          token_mint: t.token_mint,
          amount: t.amount,
          authority: t.authority,
        })),
      };
    });

  return {
    err: transaction?.meta?.err,
    info: detailedInfo,
  };
}

export function parseDirect(
  transaction: RawTransactionInfo
): TransactionInfoWrapper<SimpleTransactionInfo> {
  const instructions = transaction.transaction.message.instructions;

  const transferInstruction = find(
    instructions,
    (ins) => ins?.parsed?.type === 'transfer'
  );

  return {
    err: transaction?.meta?.err,
    info: {
      from_address: transferInstruction.parsed.info.source,
      to_address: transferInstruction.parsed.info.destination,
      amount:
        Number(String(transferInstruction.parsed.info.lamports)) /
        SOLANA_LAMPORT_DIVIDER,
      token: 'SOL',
    },
  };
}
