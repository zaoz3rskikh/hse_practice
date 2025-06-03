import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import IconBackArrow from 'shared/icons/iconBackArrow';
import { useNavigate } from 'react-router-dom';

export default function PageHeader({ text }: { text: string }) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        width: 1,
        justifyContent: 'center',
        position: 'relative ',
      }}
    >
      <Typography variant={'h4'}>{text}</Typography>
      <IconButton
        onClick={() => navigate('/')}
        sx={{
          position: 'absolute',
          left: 4,
          top: '50%',
          transform: 'translate(0, -50%)',
        }}
      >
        <IconBackArrow />
      </IconButton>
    </Box>
  );
}
