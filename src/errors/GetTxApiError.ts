export default class GetTxApiError extends Error implements GetTxErrorPort {
  public payload: GetTxErrorPayload = {};

  constructor(errors: string[]) {
    super('API error');

    errors.forEach((e) => {
      if (e === 'tx.not_found') {
        this.payload.tx = (this.payload.tx || []).concat('Tx not found');
      }
      if (e === 'tx.unknown_type') {
        this.payload.tx = (this.payload.tx || []).concat('unknown tx type');
      }
      if (e === 'server.not_found') {
        this.payload.server = (this.payload.server || []).concat('Request data not found');
      }
      if (e === 'server.error') {
        this.payload.server = (this.payload.server || []).concat('Something went wrong');
      }
    });
  }
}
