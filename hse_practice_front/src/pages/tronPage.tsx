import React from 'react';
import { Box } from '@mui/material';
import CheckTronBalanceWidget from 'widgets/tron/checkTronBalanceWidget';
import PageHeader from 'shared/components/pageHeader';
import GetTronTransactionsWidget from 'widgets/tron/getTronTransactionsWidget';

export default function TronPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        width: 1,
        justifyContent: 'center',
        p: 6,
        gap: 4,
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <PageHeader text={'Tron'} />

      <CheckTronBalanceWidget />

      <GetTronTransactionsWidget />
    </Box>
  );
}
