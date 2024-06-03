export default class CreateButtonApiError extends Error implements CreateButtonErrorPort {
  public payload: CreateButtonErrorPayload = {};

  constructor(errors: string[]) {
    super('API error');

    errors.forEach((e) => {
      if (e === 'server.not_found') {
        this.payload.server = (this.payload.server || []).concat('Request data not found');
      }
      if (e === 'server.error') {
        this.payload.server = (this.payload.server || []).concat('Something went wrong');
      }
    });
  }
}
