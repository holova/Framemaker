export default class CreateDelegateFrameValidationError extends Error
  implements CreateDelegateFrameErrorPort {
  constructor(public payload: CreateDelegateFrameErrorPayload) {
    super('Validation error');
  }
}
