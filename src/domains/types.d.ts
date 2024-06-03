type Address = string;

type UserId = number;

type FrameId = string;

interface Frame {
  readonly id?: FrameId;
  readonly name: string;
  readonly userId?: UserId;
  version: string;
  image: string;
  postUrl?: string;
  buttons: Button[];
  input?: Input;
  readonly createdAt?: Date;
  addButton(button: Button): void;
  publicURL: URL;
  warpcastDevURL: URL;
  warpcastShareURL: URL;
}

type ButtonId = string;
type ButtonPosition = 1 | 2 | 3 | 4;
type ButtonAction = 'post' | 'post_redirect' | 'link' | 'mint' | 'tx';

interface Button {
  readonly frameId: FrameId;
  position: ButtonPosition;
  action: ButtonAction;
  target: string;
  content: string;
  postUrl?: string;
  readonly id?: ButtonId;
  readonly createdAt?: Date;
}

type InputId = string;
type InputAspectRatio = '1.91:1' | '1:1';

interface Input {
  readonly id?: InputId;
  readonly frameId: FrameId;
  text: string;
  aspectRatio: InputAspectRatio;
  state: string;
  readonly createdAt?: Date;
}

type TxId = string;

interface Tx {
  readonly id?: TxId;
  readonly userId?: UserId;
  readonly type: string;
  readonly chainId: string;
  readonly method: 'eth_sendTransaction';
  readonly address: `0x${string}`;
  readonly functionName: string;
  readonly args: (string | number)[];
  readonly createdAt?: Date;
}
