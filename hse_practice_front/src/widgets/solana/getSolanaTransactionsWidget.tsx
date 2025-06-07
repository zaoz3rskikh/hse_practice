import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { TransactionListModel } from 'entities/transactionListModel';
import { getSolanaTransactionHashes } from 'entities/solana/solanaApi';
import GetTransactionListFeature from 'features/getTransactionListFeature';

export default observer(function GetSolanaTransactionsWidget() {
  const [model] = useState(
    () =>
      new TransactionListModel({ getTransactions: getSolanaTransactionHashes })
  );

  return <GetTransactionListFeature model={model} />;
});
