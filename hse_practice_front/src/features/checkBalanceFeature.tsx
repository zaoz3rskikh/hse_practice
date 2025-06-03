import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import { WalletBalanceModel } from 'entities/walletBalanceModel';

export default observer(function CheckWallet<T extends object>({
  balanceSlot,
  model,
}: {
  balanceSlot: React.ReactNode;
  model: WalletBalanceModel<T>;
}) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: 1, gap: 3 }}>
      <Typography variant={'h4'}>Balance</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: 1, gap: 2 }}>
        <TextField
          label="Wallet Address"
          value={model.wallet}
          onChange={(e) => {
            if (model?.intervalId === null) {
              model.setWallet(e.target.value);
            }
          }}
          fullWidth
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: 1,
            gap: 2,
          }}
        >
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              onClick={() => model.fetchBalance()}
              disabled={Boolean(model.isLoading || model.intervalId)}
            >
              Check Balance
            </Button>
            <Button
              variant="outlined"
              onClick={() => model.startTracking()}
              disabled={model.isLoading || !!model.intervalId || !model.wallet}
            >
              Start Tracking
            </Button>
            <Button
              variant="outlined"
              color={'error'}
              onClick={() => model.stopTracking()}
              disabled={!model.intervalId}
            >
              Stop tracking
            </Button>
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            {balanceSlot}
            {model?.isLoading && model?.balance === null && (
              <CircularProgress size={24} />
            )}
          </Box>
        </Box>
        {model.error && (
          <Typography sx={{ color: 'red' }}>{model.error}</Typography>
        )}

        {model.intervalId && (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography>Balance tacking in progress...</Typography>
            <CircularProgress size={24} />
          </Box>
        )}
      </Box>
    </Box>
  );
});
