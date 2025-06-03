import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function RootPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 4,
        p: 4,
        width: 1,
      }}
    >
      <Typography variant={'h4'} sx={{ textAlign: 'center' }}>
        Transactions and wallets tracker
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
        <Button
          variant="contained"
          onClick={() => navigate('/solana')}
          size={'large'}
        >
          Solana
        </Button>

        <Button
          variant="contained"
          onClick={() => navigate('/tron')}
          size={'large'}
        >
          Tron
        </Button>
      </Box>
    </Box>
  );
}
