import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import { getTronTransactions, TronTransaction } from 'api/tronApi';

export class TronTransactionListModel {
  private _wallet: string = '';
  private _transactions: TronTransaction[] = [];
  private _isLoading: boolean = false;
  private _error: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  get walletAddress() {
    return this._wallet;
  }

  get loading() {
    return this._isLoading;
  }

  get errorMessage() {
    return this._error;
  }

  get result() {
    return this._transactions;
  }

  setWallet(value: string) {
    this._wallet = value;
  }

  async fetch() {
    if (!this._wallet) {
      this._error = 'wallet address not specified';
      return;
    }

    this._isLoading = true;
    this._error = '';

    try {
      this._transactions = await getTronTransactions(this._wallet);
    } catch (e) {
      if (axios.isAxiosError(e) && e?.status === 400) {
        console.log(e);
        const serverErrorMessage = e?.response?.data?.error;
        if (serverErrorMessage) {
          this._error = serverErrorMessage;
        } else {
          this._error = serverErrorMessage || e?.message;
        }
      } else {
        this._error = 'Failed to fetch transactions';
      }
    } finally {
      this._isLoading = false;
    }
  }
}
