import React, { useState } from 'react';
import { WalletBalanceModel } from 'entities/walletBalanceModel';
import CheckBalanceFeature from 'features/checkBalanceFeature';
import { Box, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { getTronBalance, TronBalance } from 'entities/tron/tronApi';

export default observer(function CheckTronBalanceWidget() {
  const [model] = useState(
    () => new WalletBalanceModel<TronBalance>({ getBalance: getTronBalance })
  );
  return (
    <CheckBalanceFeature
      model={model}
      balanceSlot={
        <Box
          sx={{ opacity: model?.balance?.usdt && model?.balance?.trx ? 1 : 0 }}
        >
          <Typography>USDT: {model?.balance?.usdt}</Typography>
          <Typography>TRX: {model?.balance?.trx}</Typography>
        </Box>
      }
    />
  );
});
