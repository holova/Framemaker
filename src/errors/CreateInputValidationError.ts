export default class CreateInputValidationError extends Error implements CreateInputErrorPort {
  constructor(public payload: CreateInputErrorPayload) {
    super('Validation error');
  }
}
