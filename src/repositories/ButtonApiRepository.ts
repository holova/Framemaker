import { logout } from '@/app/actions/auth';
import { NewButton } from '@/domains';
import CreateButtonApiError from '@/errors/CreateButtonApiError';
import UpdateFrameApiError from '@/errors/UpdateFrameApiError';
import { API_BASE_URL } from '@/app/constants';

type ButtonTDO = {
  id: ButtonId;
  frame_id: FrameId
  position: ButtonPosition;
  action: ButtonAction;
  target: string;
  content: string;
  post_url?: string;
  created_at: number;
};

type CreateButtonResponse = ButtonTDO;

type UpdateButtonResponse = ButtonTDO;

export default class ButtonApiRepository implements ButtonRepository {
  constructor(protected token: string) {}

  async create(button: Button): Promise<Button> {
    const res: Response = await fetch(`${API_BASE_URL}/buttons`, {
      method: 'POST',
      headers: {
        Authorization: this.token,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        frameId: button.frameId,
        position: button.position,
        action: button.action,
        target: button.target,
        content: button.content,
        postUrl: button.postUrl,
      }),
    });

    if (res.status === 401) {
      await logout();
    }

    const data: ApiResponse<CreateButtonResponse> = await res.json();

    if (!data.status) {
      throw new CreateButtonApiError(data.errors);
    }

    return NewButton(
      data.data.frame_id,
      data.data.position,
      data.data.action,
      data.data.target,
      data.data.content,
      data.data.post_url,
      data.data.id,
      new Date(data.data.created_at),
    );
  }

  async updateOne(button: Button): Promise<void> {
    const res: Response = await fetch(`${API_BASE_URL}/buttons/${button.id}`, {
      method: 'PUT',
      headers: {
        Authorization: this.token,
        'Content-type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        position: button.position,
        action: button.action,
        target: button.target,
        content: button.content,
        postUrl: button.postUrl,
      }),
    });

    const data: ApiResponse<UpdateButtonResponse> = await res.json();

    if (!data.status) {
      throw new UpdateFrameApiError(data.errors);
    }
  }

  async deleteOne(button: Button): Promise<void> {
    await fetch(`${API_BASE_URL}/buttons/${button.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: this.token,
        Accept: 'application/json',
      },
    });
  }
}
