export const TRANSACTION_REPOSITORY = Symbol('TransactionRepository');
export const LIST_TRANSACTION_HANDLER = Symbol('ListTransactionHandler');
export const INSERT_TRANSACTION_HANDLER = Symbol('InsertTransactionHandler');
export const UPDATE_STATUS_TO_WAITING_APPROVE_HANDLER = Symbol(
  'UpdateStatusToWaitingApproveHandler',
);
export const UPDATE_STATUS_TO_APPROVED_HANDLER = Symbol(
  'UpdateStatusToApproved',
);
export const UPLOAD_PAYMENT_PROOF_HANDLER = Symbol('UploadPaymentProofHandler');
export const DELETE_TRANSACTION_HANDLER = Symbol('DeleteTransactionHandler');
export const LIST_TRANSACTION_BY_CUSTOMER_HANDLER = Symbol(
  'ListTransactionByCustomerHandler',
);
export const FIND_TRANSACTION_BY_ID_HANDLER = Symbol(
  'FindTransactionByIdHandler',
);
export const paymentImagesDir = './images/payment-proof';
