import { IsIn, IsString } from 'class-validator';
import { PLAN_KEYS, PlanKey } from '../../billing/plans';

export class CreatePlatformSubscriptionDto {
  @IsString()
  name: string;

  @IsString()
  cpfCnpj: string;

  @IsString()
  email: string;

  /** Nunca aceitar valor arbitrário do cliente — sempre resolvido a partir de PLANS. */
  @IsIn(PLAN_KEYS)
  plan: PlanKey;
}
