import { Module } from '@nestjs/common';
import { SolanaController } from 'src/solana/solana.controller';
import { TronController } from 'src/tron/tron.controller';
import { SolanaService } from 'src/solana/solana.service';
import { TronService } from 'src/tron/tron.service';

@Module({
  imports: [],
  controllers: [SolanaController, TronController],
  providers: [TronService, SolanaService],
})
export class AppModule {}
