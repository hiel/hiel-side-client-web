export interface ChangePasswordRequest {
  currentPassword: string,
  updatePassword: string,
}

export interface UpdateTransactionStartDayRequest {
  transactionStartDay: number,
}

export interface UpdateTransactionStartDayResponse {
  transactionStartDay: number,
}

export interface GetUserResponse {
  transactionStartDay: number,
}
