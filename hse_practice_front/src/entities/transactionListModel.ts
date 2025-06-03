import { makeAutoObservable } from 'mobx';
import axios from 'axios';

export class TransactionListModel {
  private _wallet: string = '';
  private _hashes: string[] = [];
  private _isLoading: boolean = false;
  private _error: string = '';

  private readonly _getTransactions: (wallet: string) => Promise<string[]>;

  constructor({
    getTransactions,
  }: {
    getTransactions: (wallet: string) => Promise<string[]>;
  }) {
    this._getTransactions = getTransactions;

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
    return this._hashes;
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
      this._hashes = await this._getTransactions(this._wallet);
    } catch (e) {
      if (axios.isAxiosError(e) && e?.status === 400) {
        const serverErrorMessage = e?.response?.data?.error;

        if (serverErrorMessage) {
          this._error = serverErrorMessage;
        } else {
          this._error = e?.message;
        }
      } else {
        this._error = 'Failed to fetch transactions';
      }
    } finally {
      this._isLoading = false;
    }
  }
}
