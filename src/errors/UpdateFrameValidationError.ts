export default class UpdateFrameValidationError extends Error implements UpdateFrameErrorPort {
  constructor(public payload: UpdateFrameErrorPayload) {
    super('Validation error');
  }
}
