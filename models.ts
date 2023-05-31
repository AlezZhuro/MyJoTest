export type CardResponseType = {
  success: boolean;
  result: CardDTO[];
};

export type CardDTO = {
  card_id: number;
  reviewer_id: number;
  name: string;
  reward: number;
  photo_required: boolean;
  video_required: boolean;
  schedule: boolean[] | null;
  period_start: string | null;
  period_stop: string | null;
  type: CardType;
  description?: string | null;
  every_month?: number[] | null;
};

export enum CardType {
  ALL = 'ALL',
  TASKS = 'TASKS',
  CORSES = 'CORSES',
}

export type AddCardType = Omit<
  CardDTO,
  'card_id' | 'photo_required' | 'schedule'
>;
