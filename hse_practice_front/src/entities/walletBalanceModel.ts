import { makeAutoObservable } from 'mobx';
import axios from 'axios';

const TIMEOUT_CHECK = 60000;

export class WalletBalanceModel<T extends object> {
  private _wallet: string = '';
  private _result: T | null = null;

  private _isLoading: boolean = false;
  private _error: string = '';

  private _intervalId: NodeJS.Timeout | null = null;

  private readonly _getBalance: (wallet: string) => Promise<T>;

  constructor({ getBalance }: { getBalance: (wallet: string) => Promise<T> }) {
    makeAutoObservable(this);

    this._getBalance = getBalance;
  }

  get wallet() {
    return this._wallet;
  }

  get isLoading() {
    return this._isLoading;
  }

  get error() {
    return this._error;
  }

  get intervalId() {
    return this._intervalId;
  }

  get balance(): T | null {
    return this._result;
  }

  setWallet(value: string) {
    this._wallet = value;
  }

  async fetchBalance() {
    if (!this._wallet) {
      this._error = 'wallet address not specified';
      return;
    }

    this._isLoading = true;
    this._error = '';

    try {
      this._result = await this._getBalance(this._wallet);
    } catch (e) {
      if (axios.isAxiosError(e) && e?.status === 400) {
        const serverErrorMessage = e?.response?.data?.error;

        if (serverErrorMessage) {
          this._error = serverErrorMessage;
        } else {
          this._error = e?.message;
        }
      } else {
        this._error = 'Failed to fetch balance';
      }
    } finally {
      this._isLoading = false;
    }
  }

  async startTracking() {
    if (this._intervalId) {
      return;
    }

    await this.fetchBalance();

    if (this._error) {
      return;
    }

    this._intervalId = setInterval(async () => {
      const prev = this._result;
      try {
        const res = await this._getBalance(this._wallet);
        if (JSON.stringify(prev) !== JSON.stringify(res)) {
          this._result = res;
          alert('Balance changed');
        }
      } catch (e) {
        console.error(e);
      }
    }, TIMEOUT_CHECK) as any;
  }

  stopTracking() {
    if (this._intervalId) {
      clearInterval(this._intervalId);
      this._intervalId = null;
    }
  }
}
