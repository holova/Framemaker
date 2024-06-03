export default class GetFramesListValidationError extends Error implements GetFramesListErrorPort {
  constructor(public payload: GetFramesListErrorPayload) {
    super('Validation error');
  }
}
