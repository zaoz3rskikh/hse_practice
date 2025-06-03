export type TransactionInfoWrapper<T> = {
  err: null | object;
  info: T;
};

export type DetailedTransactionInfo = {
  flow_id: number;
  summary: {
    initial: {
      token_mint: string;
      amount: string;
    };
    result: {
      token_mint: string;
      amount: string;
    };
  };
  detailed: {
    from_addres: string;
    to_address: string;
    token_mint: string;
    amount: string;
    authority: string;
  }[];
}[];

export type SimpleTransactionInfo = {
  from_address: string;
  to_address: string;
  amount: number;
  token: string;
};

export type TransferGroup = {
  id: number;
  transfers: {
    from_addres: string;
    to_address: string;
    token_mint: string;
    amount: string;
    authority?: string;
  }[];
};
