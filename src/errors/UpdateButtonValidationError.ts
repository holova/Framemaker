export default class UpdateButtonValidationError extends Error implements UpdateButtonErrorPort {
  constructor(public payload: UpdateButtonErrorPayload) {
    super('Validation error');
  }
}
