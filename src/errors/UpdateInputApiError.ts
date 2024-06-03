export default class UpdateInputApiError extends Error implements UpdateInputErrorPort {
  public payload: UpdateInputErrorPayload = {};

  constructor(errors: string[]) {
    super('API error');

    errors.forEach((e) => {
      if (e === 'input.not_found') {
        this.payload.input = (this.payload.input || []).concat('Input not found');
      }
      if (e === 'input.forbidden') {
        this.payload.input = (this.payload.input || []).concat('You do not have permission to update the input');
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
