import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';

import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider,
} from '@mui/material';
import { SolanaTransactionDetailsModel } from 'entities/solana/solanaTransactionModel';

export default observer(function SolanaTransactionInfoWidget() {
  const [model] = useState(() => new SolanaTransactionDetailsModel());

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: 1 }}>
      <Typography variant={'h4'}>Detailed transaction info</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 1 }}>
        <TextField
          label="Transaction Hash"
          value={model.transactionHash}
          onChange={(e) => model.setHash(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          onClick={() => model.fetch()}
          disabled={model.loading}
        >
          Fetch Transaction Details
        </Button>
        {model.loading ? (
          <CircularProgress size={24} />
        ) : model.errorMessage ? (
          <Typography color="error">{model.errorMessage}</Typography>
        ) : model.result ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              maxWidth: '90vw',
              overflowX: 'scroll',
            }}
          >
            {Array.isArray(model.result.info) ? (
              model.result.info.map((flow) => (
                <Box
                  key={flow.flow_id}
                  sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
                >
                  <Typography variant="h6">Flow #{flow.flow_id}</Typography>
                  <Typography>
                    Initial: {flow.summary.initial.amount} (
                    {flow.summary.initial.token_mint})
                  </Typography>
                  <Typography>
                    Result: {flow.summary.result.amount} (
                    {flow.summary.result.token_mint})
                  </Typography>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>From</TableCell>
                        <TableCell>To</TableCell>
                        <TableCell>Token</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Authority</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {flow.detailed.map((tx, i) => (
                        <TableRow key={i}>
                          <TableCell>{tx.from_addres}</TableCell>
                          <TableCell>{tx.to_address}</TableCell>
                          <TableCell>{tx.token_mint}</TableCell>
                          <TableCell>{tx.amount}</TableCell>
                          <TableCell>{tx.authority}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <Divider />
                </Box>
              ))
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="h6">Simple Transfer</Typography>
                <Typography>From: {model.result.info.from_address}</Typography>
                <Typography>To: {model.result.info.to_address}</Typography>
                <Typography>Amount: {model.result.info.amount}</Typography>
                <Typography>Token: {model.result.info.token}</Typography>
              </Box>
            )}
          </Box>
        ) : null}
      </Box>
    </Box>
  );
});
