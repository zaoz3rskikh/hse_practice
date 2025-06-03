import React from 'react';
import { Box } from '@mui/material';
import CheckSolanaBalanceWidget from 'widgets/solana/checkSolanaBalanceWidget';
import SolanaTransactionInfoWidget from 'widgets/solana/solanaTransactionInfoWidget';
import GetSolanaTransactionsWidget from 'widgets/solana/getSolanaTransactionsWidget';
import PageHeader from 'shared/components/pageHeader';

export default function SolanaPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        width: 1,
        justifyContent: 'center',
        p: 6,
        gap: 8,
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <PageHeader text={'Solana'} />

      <CheckSolanaBalanceWidget />

      <GetSolanaTransactionsWidget />

      <SolanaTransactionInfoWidget />
    </Box>
  );
}
