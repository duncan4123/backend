import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  Index,
} from 'typeorm';
import { BlockchainType } from '../deployment/deployment.service';

@Entity({ name: 'historic-quotes' })
@Index(['tokenAddress', 'timestamp'], { unique: false })
export class HistoricQuote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: BlockchainType, default: 'ethereum' })
  @Index()
  blockchainType: BlockchainType;

  @PrimaryColumn('timestamp')
  timestamp: Date;

  @Column()
  @Index()
  tokenAddress: string;

  @Column()
  provider: string;

  @Column()
  usd: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
