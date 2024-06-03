export default class GetFrameApiError extends Error implements GetFrameErrorPort {
  public payload: GetFrameErrorPayload = {};

  constructor(errors: string[]) {
    super('API error');

    errors.forEach((e) => {
      if (e === 'frame.not_found') {
        this.payload.frame = (this.payload.frame || []).concat('Frame not found');
      }
      if (e === 'frame.forbidden') {
        this.payload.frame = (this.payload.frame || []).concat('You do not have permission to delete the frame');
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
