import { IsArray, ValidateNested, IsNumber, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';

export class HistoricQuote {
  @IsNumber()
  timestamp: number;

  @IsNumber()
  open: number;

  @IsNumber()
  high: number;

  @IsNumber()
  low: number;

  @IsNumber()
  close: number;
}

export class PredictionDataDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HistoricQuote)
  @ArrayMinSize(2) // Ensure at least two data points
  predictionData: HistoricQuote[];
}