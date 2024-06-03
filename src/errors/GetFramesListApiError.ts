export default class GetFramesListApiError extends Error implements GetFramesListErrorPort {
  public payload: GetFramesListErrorPayload = {};

  constructor(errors: string[]) {
    super('API error');

    errors.forEach((e) => {
      if (e === 'query.incorrect') {
        this.payload.skip = (this.payload.skip || []).concat('Incorrect skip value');
        this.payload.take = (this.payload.take || []).concat('Incorrect take value');
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
