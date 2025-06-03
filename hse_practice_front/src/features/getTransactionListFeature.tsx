import { observer } from 'mobx-react-lite';
import React from 'react';
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
import { TransactionListModel } from 'entities/transactionListModel';

export default observer(function GetTransactionListFeature({
  model,
}: {
  model: TransactionListModel;
}) {
  const handleCopy = (hash: string) => {
    navigator.clipboard.writeText(hash);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: 1 }}>
      <Typography variant={'h4'}>Transaction hashes</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 1 }}>
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
          <List
            sx={{
              maxHeight: '600px',
              overflowY: 'scroll',
              maxWidth: '90vw',
              overflowX: 'scroll',
            }}
          >
            {model.result.map((hash) => (
              <ListItem
                key={hash}
                secondaryAction={
                  <IconButton edge="end" onClick={() => handleCopy(hash)}>
                    <IconCopy />
                  </IconButton>
                }
              >
                <ListItemText primary={hash} />
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
});
