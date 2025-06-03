import { observer } from 'mobx-react-lite';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import IconCopy from 'shared/icons/iconCopy';
import { TronTransactionListModel } from 'entities/tron/tronTransactionListModel';
import React, { useState } from 'react';

export default observer(function GetTronTransactionsWidget() {
  const [model] = useState(() => new TronTransactionListModel());

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: 1 }}>
      <Typography variant="h4">Transactions & details</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Wallet Address"
          value={model.walletAddress}
          onChange={(e) => model.setWallet(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          onClick={() => model.fetch()}
          disabled={model.loading}
        >
          Fetch Transactions
        </Button>
        {model.loading ? (
          <CircularProgress size={24} />
        ) : model.errorMessage ? (
          <Typography color="error">{model.errorMessage}</Typography>
        ) : (
          <List sx={{ maxHeight: 600, overflowY: 'scroll' }}>
            {model.result.map((tx) => (
              <ListItem
                key={tx.transaction_id}
                sx={{ flexDirection: 'column', alignItems: 'flex-start' }}
              >
                <ListItemText
                  primary={
                    <Box>
                      Transaction ID: ${tx.transaction_id}
                      <IconButton
                        edge="end"
                        onClick={() => handleCopy(tx.transaction_id)}
                      >
                        <IconCopy />
                      </IconButton>
                    </Box>
                  }
                  secondary={
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 0.5,
                      }}
                    >
                      <Typography variant="body2">From: {tx.from}</Typography>
                      <Typography variant="body2">To: {tx.to}</Typography>
                      <Typography variant="body2">Type: {tx.type}</Typography>
                      <Typography variant="body2">
                        Value: {Number(tx.value) / 10 ** tx.token_info.decimals}{' '}
                        {tx.token_info.symbol}
                      </Typography>
                      <Typography variant="body2">
                        Token Name: {tx.token_info.name}
                      </Typography>
                      <Typography variant="body2">
                        Token Address: {tx.token_info.address}
                      </Typography>
                      <Typography variant="body2">
                        Token Decimals: {tx.token_info.decimals}
                      </Typography>
                      <Typography variant="body2">
                        Timestamp:{' '}
                        {new Date(tx.block_timestamp).toLocaleString()}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
});
