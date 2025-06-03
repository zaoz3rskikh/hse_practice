export type InnerInstruction = {
  index: number;
  instructions: {
    program: string;
    parsed: {
      type: string;
      info: {
        authority?: string;
        source?: string;
        destination?: string;
        mint?: string;
        tokenAmount?: {
          amount: string;
          decimals: number | string;
          uiAmount: number;
          uiAmountString: string;
        };
      };
    };
  }[];
};

export type TransactionInstruction = {
  parsed?: {
    info?: {
      destination: string;
      lamports: string;
      source: string;
    };
    type: string;
  };
};

export type RawTransactionInfo = {
  meta: {
    err: object | null;
    innerInstructions: InnerInstruction[];
  };
  transaction: {
    message: {
      instructions: TransactionInstruction[];
    };
  };
};
