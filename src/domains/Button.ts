export class ButtonDomain implements Button {
  constructor(
    readonly frameId: FrameId,
    public position: ButtonPosition,
    public action: ButtonAction,
    public target: string,
    public content: string,
    public postUrl?: string,
    readonly id?: ButtonId,
    readonly createdAt?: Date,
  ) {
  }
}

export function NewButton(
  frameId: FrameId,
  position: ButtonPosition,
  action: ButtonAction,
  target: string,
  content: string,
  postUrl?: string,
  id?: InputId,
  createdAt?: Date,
): Button {
  return new ButtonDomain(
    frameId,
    position,
    action,
    target,
    content,
    postUrl,
    id,
    createdAt,
  );
}
