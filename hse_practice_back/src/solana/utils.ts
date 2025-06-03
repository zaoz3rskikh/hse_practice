import { createSolanaRpc } from '@solana/kit';

const rpc_url = 'https://api.mainnet-beta.solana.com';

export const SOLANA_RPC = createSolanaRpc(rpc_url);

export const SOLANA_USDT_MINT = 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB';

export const SOLANA_USDC_MINT = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';

export const SOLANA_LAMPORT_DIVIDER = 1000000000;
