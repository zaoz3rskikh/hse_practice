import { TronWeb } from 'tronweb';

export const tronWeb = new TronWeb({
  fullNode: 'https://api.trongrid.io',
  solidityNode: 'https://api.trongrid.io',
});

export const TRON_TEST_ADDRESS = 'TTSFjEG3Lu9WkHdp4JrWYhbGP6K1REqnGQ';

export const TRON_USDT_CONTRACT = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t';

export const TRON_TRX_CONTRACT = 'TNUC9Qb1rRpS5CbWLmNMxXBjyFoydXjWFR';

export const TRON_BALANCE_DIVIDER = 1000000;
