export class InputDomain implements Input {
  constructor(
    readonly frameId: FrameId,
    public text: string,
    public aspectRatio: InputAspectRatio,
    public state: string,
    readonly id?: InputId,
    readonly createdAt?: Date,
  ) {
  }
}

export function NewInput(
  frameId: FrameId,
  text: string,
  aspectRatio: InputAspectRatio = '1.91:1',
  state: string = '{}',
  id?: InputId,
  createdAt?: Date,
): Input {
  return new InputDomain(
    frameId,
    text,
    aspectRatio,
    state,
    id,
    createdAt,
  );
}
