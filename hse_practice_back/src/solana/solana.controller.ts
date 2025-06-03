import { Controller, Get, Inject, Param, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BalanceDTO } from 'src/solana/dto/balanceDTO';
import { GlobalErrorFilter } from 'src/proxy/globalErrorFilter';
import { SolanaService } from 'src/solana/solana.service';
import { TransactionInfoDTO } from 'src/solana/dto/transactionInfoDTO';

@ApiTags('solana')
@Controller('solana')
@UseFilters(GlobalErrorFilter)
export class SolanaController {
  @Inject(SolanaService)
  private _solanaService: SolanaService;

  @Get('/balance/:address')
  async getBalance(@Param('address') address: string): Promise<BalanceDTO> {
    return this._solanaService.getBalance(address);
  }

  @Get('/transactions/:address')
  async getTransactions(@Param('address') address: string): Promise<string[]> {
    return this._solanaService.getTransactions(address);
  }

  @Get('/transaction/:hash')
  async getTransactionInfo(
    @Param('hash') hash: string
  ): Promise<TransactionInfoDTO> {
    return this._solanaService.getTransactionInfo(hash);
  }
}
