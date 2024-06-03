export default class CreateFrameValidationError extends Error implements CreateFrameErrorPort {
  constructor(public payload: CreateFrameErrorPayload) {
    super('Validation error');
  }
}
