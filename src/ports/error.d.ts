interface ErrorPort<P> {
  payload: P
}

type ServerErrorPayloadKeys = 'server';
type ErrorPayload<K> = Partial<Record<K | ServerErrorPayloadKeys, string[]>>;

type GetFramesListErrorPayloadKeys = 'take' | 'skip';
type GetFramesListErrorPayload = ErrorPayload<GetFramesListErrorPayloadKeys>;
type GetFramesListErrorPort = ErrorPort<GetFramesListErrorPayload>;

type GetFrameErrorPayloadKeys = 'frame';
type GetFrameErrorPayload = ErrorPayload<GetFrameErrorPayloadKeys>;
type GetFrameErrorPort = ErrorPort<GetFrameErrorPayload>;

type CreateFrameErrorPayloadKeys = 'name' | 'image' | 'version' | 'postUrl';
type CreateFrameErrorPayload = ErrorPayload<CreateFrameErrorPayloadKeys>;
type CreateFrameErrorPort = ErrorPort<CreateFrameErrorPayload>;

type UpdateFrameErrorPayloadKeys = 'frame' | 'name' | 'image' | 'version' | 'postUrl';
type UpdateFrameErrorPayload = ErrorPayload<UpdateFrameErrorPayloadKeys>;
type UpdateFrameErrorPort = ErrorPort<UpdateFrameErrorPayload>;

type DeleteFrameErrorPayloadKeys = 'frame';
type DeleteFrameErrorPayload = ErrorPayload<DeleteFrameErrorPayloadKeys>;
type DeleteFrameErrorPort = ErrorPort<DeleteFrameErrorPayload>;

type CreateButtonErrorPayloadKeys = 'frameId' | 'position' | 'action' | 'target' | 'content' | 'postUrl';
type CreateButtonErrorPayload = ErrorPayload<CreateButtonErrorPayloadKeys>;
type CreateButtonErrorPort = ErrorPort<CreateButtonErrorPayload>;

type UpdateButtonErrorPayloadKeys = 'frame' | 'name' | 'image' | 'version' | 'postUrl';
type UpdateButtonErrorPayload = ErrorPayload<UpdateButtonErrorPayloadKeys>;
type UpdateButtonErrorPort = ErrorPort<UpdateButtonErrorPayload>;

type CreateInputErrorPayloadKeys = 'frameId' | 'text' | 'aspectRatio' | 'state';
type CreateInputErrorPayload = ErrorPayload<CreateInputErrorPayloadKeys>;
type CreateInputErrorPort = ErrorPort<CreateInputErrorPayload>;

type UpdateInputErrorPayloadKeys = 'input' | 'id' | 'text' | 'aspectRatio' | 'state';
type UpdateInputErrorPayload = ErrorPayload<UpdateInputErrorPayloadKeys>;
type UpdateInputErrorPort = ErrorPort<UpdateInputErrorPayload>;

type CreateDelegateFrameErrorPayloadKeys = 'name' | 'image' | 'content' | 'postUrl' | 'address' | 'chainId';
type CreateDelegateFrameErrorPayload = ErrorPayload<CreateDelegateFrameErrorPayloadKeys>;
type CreateDelegateFrameErrorPort = ErrorPort<CreateDelegateFrameErrorPayload>;

type GetTxErrorPayloadKeys = 'tx';
type GetTxErrorPayload = ErrorPayload<GetTxErrorPayloadKeys>;
type GetTxErrorPort = ErrorPort<GetTxErrorPayload>;
