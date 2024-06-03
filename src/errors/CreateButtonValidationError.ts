export default class CreateButtonValidationError extends Error implements CreateButtonErrorPort {
  constructor(public payload: CreateButtonErrorPayload) {
    super('Validation error');
  }
}
