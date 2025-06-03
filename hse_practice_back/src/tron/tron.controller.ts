import { Controller, Get, Inject, Param, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BalanceDTO } from 'src/tron/dto/balanceDTO';
import { GlobalErrorFilter } from 'src/proxy/globalErrorFilter';
import { TronService } from 'src/tron/tron.service';
import { TransactionsDTO } from 'src/tron/dto/transactionsDTO';

@ApiTags('tron')
@Controller('tron')
@UseFilters(GlobalErrorFilter)
export class TronController {
  @Inject(TronService)
  private _tronService: TronService;

  @Get('/balance/:address')
  async getBalance(@Param('address') address: string): Promise<BalanceDTO> {
    return this._tronService.getBalance(address);
  }

  @Get('/transactions/:address')
  async getTransactionHistory(
    @Param('address') address: string
  ): Promise<TransactionsDTO> {
    return this._tronService.getTransactionHistory(address);
  }
}
