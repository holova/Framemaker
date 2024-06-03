export default class UpdateButtonApiError extends Error implements UpdateButtonErrorPort {
  public payload: UpdateButtonErrorPayload = {};

  constructor(errors: string[]) {
    super('API error');

    errors.forEach((e) => {
      if (e === 'button.not_found') {
        this.payload.frame = (this.payload.frame || []).concat('Button not found');
      }
      if (e === 'button.forbidden') {
        this.payload.frame = (this.payload.frame || []).concat('You do not have permission to update the button');
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
