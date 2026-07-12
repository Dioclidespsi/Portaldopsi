import { IsIn, IsUrl } from 'class-validator';
import { PLAN_KEYS, PlanKey } from '../plans';

export class CreateCheckoutDto {
  @IsIn(PLAN_KEYS)
  plan: PlanKey;

  @IsUrl({ require_tld: false })
  successUrl: string;

  @IsUrl({ require_tld: false })
  cancelUrl: string;
}
