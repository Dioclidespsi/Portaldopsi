/**
 * Planos da assinatura da plataforma — únicos valores aceitos, nunca vindos
 * do cliente (evita alguém forjar `value` mais baixo na cobrança). Preço
 * confirmado pelo psicólogo titular do projeto: R$150/mês ou R$1.500/ano.
 */
export const PLANS = {
  MONTHLY: { cycle: 'MONTHLY' as const, valueCents: 15000, label: 'Mensal — R$ 150,00/mês' },
  YEARLY: { cycle: 'YEARLY' as const, valueCents: 150000, label: 'Anual — R$ 1.500,00/ano' },
};

export type PlanKey = keyof typeof PLANS;
export const PLAN_KEYS = Object.keys(PLANS) as PlanKey[];
