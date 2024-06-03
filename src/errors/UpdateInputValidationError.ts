export default class UpdateInputValidationError extends Error implements UpdateInputErrorPort {
  constructor(public payload: UpdateInputErrorPayload) {
    super('Validation error');
  }
}
