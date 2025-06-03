import { makeAutoObservable } from 'mobx';
import {
  getSolanaTransactionInfo,
  SolanaTransactionInfo,
  ShortTransactionInfo,
} from 'api/solanaApi';
import axios from 'axios';

export class SolanaTransactionDetailsModel {
  private hash: string = '';
  private info: SolanaTransactionInfo | null = null;
  private isLoading: boolean = false;
  private _error: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  get transactionHash() {
    return this.hash;
  }

  get loading() {
    return this.isLoading;
  }

  get errorMessage() {
    return this._error;
  }

  get result(): SolanaTransactionInfo | null {
    return this.info;
  }

  setHash(value: string) {
    this.hash = value;
  }

  async fetch() {
    if (!this.hash) {
      this._error = 'transaction hash not specified';
      return;
    }

    this.isLoading = true;
    this._error = '';

    try {
      this.info = await getSolanaTransactionInfo(this.hash);
    } catch (e) {
      if (axios.isAxiosError(e) && e?.status === 400) {
        const serverErrorMessage = e?.response?.data?.error;

        if (serverErrorMessage) {
          this._error = serverErrorMessage;
        } else {
          this._error = e?.message;
        }
      } else {
        this._error = 'Failed to fetch transaction details';
      }
    } finally {
      this.isLoading = false;
    }
  }
}
