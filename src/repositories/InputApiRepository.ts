import { logout } from '@/app/actions/auth';
import { NewInput } from '@/domains';
import CreateInputApiError from '@/errors/CreateInputApiError';
import UpdateFrameApiError from '@/errors/UpdateFrameApiError';
import { API_BASE_URL } from '@/app/constants';

type InputTDO = {
  id: InputId;
  frame_id: FrameId
  text: string;
  aspect_ratio: InputAspectRatio;
  state: string;
  created_at: number;
};

type CreateInputResponse = InputTDO;

type UpdateInputResponse = InputTDO;

export default class InputApiRepository implements InputRepository {
  constructor(protected token: string) {}

  async create(input: Input): Promise<Input> {
    const res: Response = await fetch(`${API_BASE_URL}/inputs`, {
      method: 'POST',
      headers: {
        Authorization: this.token,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        frameId: input.frameId,
        text: input.text,
        aspectRatio: input.aspectRatio,
        state: input.state,
      }),
    });

    if (res.status === 401) {
      await logout();
    }

    const data: ApiResponse<CreateInputResponse> = await res.json();

    if (!data.status) {
      throw new CreateInputApiError(data.errors);
    }

    return NewInput(
      data.data.frame_id,
      data.data.text,
      data.data.aspect_ratio,
      data.data.state,
      data.data.id,
      new Date(data.data.created_at),
    );
  }

  async updateOne(input: Input): Promise<void> {
    const res: Response = await fetch(`${API_BASE_URL}/inputs/${input.id}`, {
      method: 'PUT',
      headers: {
        Authorization: this.token,
        'Content-type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        text: input.text,
        aspectRatio: input.aspectRatio,
        state: input.state,
      }),
    });

    const data: ApiResponse<UpdateInputResponse> = await res.json();

    if (!data.status) {
      throw new UpdateFrameApiError(data.errors);
    }
  }

  async deleteOne(input: Input): Promise<void> {
    await fetch(`${API_BASE_URL}/inputs/${input.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: this.token,
        Accept: 'application/json',
      },
    });
  }
}
