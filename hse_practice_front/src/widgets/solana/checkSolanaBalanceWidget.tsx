import React, { useState } from 'react';
import { WalletBalanceModel } from 'entities/walletBalanceModel';
import { getSolanaBalance, SolanaBalance } from 'entities/solana/solanaApi';
import CheckBalanceFeature from 'features/checkBalanceFeature';
import { Box, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';

export default observer(function CheckSolanaBalanceWidget() {
  const [model] = useState(
    () =>
      new WalletBalanceModel<SolanaBalance>({ getBalance: getSolanaBalance })
  );
  return (
    <CheckBalanceFeature
      model={model}
      balanceSlot={
        <Box sx={{ opacity: model?.balance ? 1 : 0 }}>
          <Typography>USDT: {model?.balance?.usdt || 'No data'}</Typography>
          <Typography>USDC: {model?.balance?.usdc || 'No data'}</Typography>
        </Box>
      }
    />
  );
});
