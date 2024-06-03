interface UseCaseInPort<In> {
  execute(req: In): Promise<void> | void;
}
interface UseCaseOutPort<Out> {
  present(out: Out): Promise<void> | void;
}

type GetFramesListIn = {
  take: number;
  skip: number;
};
type GetFramesListOut = {
  items: Frame[];
  count: number;
};
type GetFramesListInPort = UseCaseInPort<GetFramesListIn>;
type GetFramesListOutPort = UseCaseOutPort<GetFramesListOut>;

type GetFrameIn = {
  id: FrameId
};
type GetFrameOut = {
  frame: Frame;
};
type GetFrameInPort = UseCaseInPort<GetFrameIn>;
type GetFrameOutPort = UseCaseOutPort<GetFrameOut>;

type CreateFrameIn = {
  name: string,
  image: string,
  version: string,
  postUrl?: string,
};
type CreateFrameOut = {
  frame: Frame;
};
type CreateFrameInPort = UseCaseInPort<CreateFrameIn>;
type CreateFrameOutPort = UseCaseOutPort<CreateFrameOut>;

type UpdateFrameIn = {
  frame: Frame;
};
type UpdateFrameOut = {
};
type UpdateFrameInPort = UseCaseInPort<UpdateFrameIn>;
type UpdateFrameOutPort = UseCaseOutPort<UpdateFrameOut>;

type DeleteFrameIn = {
  frame: Frame;
};
type DeleteFrameOut = {
};
type DeleteFrameInPort = UseCaseInPort<DeleteFrameIn>;
type DeleteFrameOutPort = UseCaseOutPort<DeleteFrameOut>;

type CreateButtonIn = {
  frameId: FrameId;
  position: ButtonPosition;
  action: ButtonAction;
  target: string;
  content: string;
  postUrl?: string;
};
type CreateButtonOut = {
  button: Button;
};
type CreateButtonInPort = UseCaseInPort<CreateButtonIn>;
type CreateButtonOutPort = UseCaseOutPort<CreateButtonOut>;

type UpdateButtonIn = {
  button: Button;
};
type UpdateButtonOut = {
};
type UpdateButtonInPort = UseCaseInPort<UpdateButtonIn>;
type UpdateButtonOutPort = UseCaseOutPort<UpdateButtonOut>;

type DeleteButtonIn = {
  button: Button;
};
type DeleteButtonOut = {
};
type DeleteButtonInPort = UseCaseInPort<DeleteButtonIn>;
type DeleteButtonOutPort = UseCaseOutPort<DeleteButtonOut>;

type CreateInputIn = {
  frameId: FrameId;
  text: string;
  aspectRatio: InputAspectRatio;
  state?: string;
};
type CreateInputOut = {
  input: Input;
};
type CreateInputInPort = UseCaseInPort<CreateInputIn>;
type CreateInputOutPort = UseCaseOutPort<CreateInputOut>;

type UpdateInputIn = {
  input: Input;
};
type UpdateInputOut = {
};
type UpdateInputInPort = UseCaseInPort<UpdateInputIn>;
type UpdateInputOutPort = UseCaseOutPort<UpdateInputOut>;

type DeleteInputIn = {
  input: Input;
};
type DeleteInputOut = {
};
type DeleteInputInPort = UseCaseInPort<DeleteInputIn>;
type DeleteInputOutPort = UseCaseOutPort<DeleteInputOut>;

type CreateDelegateFrameIn = {
  frame: {
    name: string;
    image: string;
  }
  button: {
    content: string;
    postUrl: string;
  }
  tx: {
    type: string;
    chainId: string;
    method: 'eth_sendTransaction';
    address: `0x${string}`;
    functionName: string;
    args: (string | number)[];
  }
};
type CreateDelegateFrameOut = {
  frame: Frame;
};
type CreateDelegateFrameInPort = UseCaseInPort<CreateDelegateFrameIn>;
type CreateDelegateFrameOutPort = UseCaseOutPort<CreateDelegateFrameOut>;

type GetTxIn = {
  id: TxId
};
type GetTxOut = {
  tx: Tx;
};
type GetTxInPort = UseCaseInPort<GetTxIn>;
type GetTxOutPort = UseCaseOutPort<GetTxOut>;
