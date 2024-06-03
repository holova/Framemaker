export class FrameDomain implements Frame {
  protected _buttons: Button[] = [];

  input?: Input;

  constructor(
    readonly name: string,
    public version: string,
    public image: string,
    readonly id?: FrameId,
    readonly userId?: UserId,
    readonly createdAt?: Date,
    public postUrl?: string,
  ) {
  }

  addButton(button: Button) {
    if (this.buttons.length >= 4) return;

    this._buttons.push(button);
  }

  get buttons() {
    return this._buttons;
  }

  get publicURL(): URL {
    return new URL(`${window.location.origin}/${this.id}`);
  }

  get warpcastDevURL(): URL {
    const params = new URLSearchParams();
    params.append('url', this.publicURL.toString());
    return new URL(`https://warpcast.com/~/developers/frames?${params.toString()}`);
  }

  get warpcastShareURL(): URL {
    const params = new URLSearchParams();
    params.append('embeds[]', this.publicURL.toString());
    return new URL(`https://warpcast.com/~/compose?${params.toString()}`);
  }
}

export function NewFrame(
  name: string,
  image: string,
  version: string = 'vNext',
  postUrl?: string,
  userId?: UserId,
  id?: FrameId,
  createdAt?: Date,
): Frame {
  return new FrameDomain(
    name,
    version,
    image,
    id,
    userId,
    createdAt,
    postUrl,
  );
}
