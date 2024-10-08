import { z } from 'zod';

export enum STATUS {
  WAITING_PAYMENT = 'waiting payment',
  WAITING_APPROVE = 'waiting approve',
  APPROVED = 'approved',
}

const TransactionSchema = z.object({
  id: z.number().optional(),
  customer_id: z.string().uuid(),
  quantity: z.number().int().nonnegative(),
  total_payment: z.number().int().nonnegative(),
  status: z.nativeEnum(STATUS),
  attachment: z.string().nullable(),
  trip_id: z.string().uuid(),
  booking_date: z.date(),
  created_at: z.date(),
  updated_at: z.date(),
});

export type TransactionProps = z.infer<typeof TransactionSchema>;

export class Transaction {
  constructor(private props: TransactionProps) {}

  getProps() {
    return this.props;
  }

  public static create(props: TransactionProps) {
    const validatedProps = TransactionSchema.parse(props);
    return new Transaction(validatedProps);
  }

  updateStatus(status: STATUS) {
    this.props.status = TransactionSchema.shape.status.parse(status);
    this.update();
  }

  updateAttachment(fileName: string) {
    this.props.attachment = TransactionSchema.shape.attachment.parse(fileName);
    this.update();
  }

  private update() {
    this.props.updated_at = new Date();
  }
}
