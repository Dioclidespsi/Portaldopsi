import { ArrayMinSize, IsArray, IsIn, IsInt, IsISO8601, IsOptional, Matches, Min } from 'class-validator';

/** HH:mm, 00-23 : 00-59. */
const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;

export class CreateSlotBlockDto {
  @IsISO8601()
  fromDate: string;

  @IsISO8601()
  toDate: string;

  /** 0=domingo ... 6=sábado, igual Date.getDay(). */
  @IsArray()
  @ArrayMinSize(1)
  @IsInt({ each: true })
  @IsIn([0, 1, 2, 3, 4, 5, 6], { each: true })
  daysOfWeek: number[];

  @Matches(TIME_PATTERN, { message: 'startTime deve estar no formato HH:mm' })
  startTime: string;

  @Matches(TIME_PATTERN, { message: 'endTime deve estar no formato HH:mm' })
  endTime: string;

  @IsInt()
  @Min(5)
  durationMinutes: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  intervalMinutes?: number;
}
