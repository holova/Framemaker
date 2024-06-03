import { NewFrame } from '@/domains/Frame';
import { logout } from '@/app/actions/auth';
import { NewInput, NewButton } from '@/domains';
import GetFramesListApiError from '@/errors/GetFramesListApiError';
import CreateFrameApiError from '@/errors/CreateFrameApiError';
import GetFrameApiError from '@/errors/GetFrameApiError';
import UpdateFrameApiError from '@/errors/UpdateFrameApiError';
import DeleteFrameApiError from '@/errors/DeleteFrameApiError';
import { API_BASE_URL } from '@/app/constants';

type GetFramesListResponse = {
  count: number;
  items: FrameDTO[];
};

type FrameDTO = {
  id: FrameId;
  name: string;
  user_id: number;
  version: string;
  image: string;
  post_url: string;
  created_at: number;
};

type InputDTO = {
  id: InputId;
  text: string;
  aspect_ratio: InputAspectRatio;
  state: string;
  created_at: number;
};

type ButtonDTO = {
  id: ButtonId;
  position: ButtonPosition;
  action: ButtonAction;
  target: string;
  content: string;
  post_url?: string;
  created_at: number;
};

type CreateFrameResponse = FrameDTO;

type GetFrameResponse = FrameDTO & {
  input: InputDTO;
  buttons: ButtonDTO[];
};

type UpdateFrameResponse = FrameDTO & {
  input: InputDTO;
  buttons: ButtonDTO[];
};

type DeleteFrameResponse = {
};

export default class FrameApiRepository implements FrameRepository {
  constructor(protected token: string = '') {}

  async find(filter: FrameFilters, take?: string, skip?: string): Promise<FrameFindResponse> {
    const params = new URLSearchParams();
    if (take) params.append('take', take);
    if (skip)params.append('skip', skip);

    const res: Response = await fetch(`${API_BASE_URL}/frames?${params.toString()}`, {
      headers: {
        Authorization: this.token,
        Accept: 'application/json',
      },
    });

    const data: ApiResponse<GetFramesListResponse> = await res.json();

    if (!data.status) {
      throw new GetFramesListApiError(data.errors);
    }

    return {
      items: (data.data.items || []).map((frame) => NewFrame(
        frame.name,
        frame.image,
        frame.version,
        frame.post_url,
        frame.user_id,
        frame.id,
        new Date(frame.created_at),
      )),
      count: data.data.count || 0,
    };
  }

  async create(frame: Frame): Promise<Frame> {
    const res: Response = await fetch(`${API_BASE_URL}/frames`, {
      method: 'POST',
      headers: {
        Authorization: this.token,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        name: frame.name,
        version: frame.version,
        image: frame.image,
        postUrl: frame.postUrl,
      }),
    });

    if (res.status === 401) {
      await logout();
    }

    const data: ApiResponse<CreateFrameResponse> = await res.json();

    if (!data.status) {
      throw new CreateFrameApiError(data.errors);
    }

    return NewFrame(
      data.data.name,
      data.data.image,
      data.data.version,
      data.data.post_url,
      data.data.user_id,
      data.data.id,
      new Date(data.data.created_at),
    );
  }

  async findOne(frameId: FrameId): Promise<Frame> {
    const res: Response = await fetch(`${API_BASE_URL}/frames/${frameId}`, {
      headers: {
        Authorization: this.token,
        Accept: 'application/json',
      },
    });

    const data: ApiResponse<GetFrameResponse> = await res.json();

    if (!data.status) {
      throw new GetFrameApiError(data.errors);
    }

    const { data: fData } = data;
    const { input: iData, buttons: bData } = fData;
    const frame = NewFrame(
      fData.name,
      fData.image,
      fData.version,
      fData.post_url,
      fData.user_id,
      fData.id,
      new Date(fData.created_at),
    );

    if (iData.id) {
      frame.input = NewInput(
        fData.id,
        iData.text,
        iData.aspect_ratio,
        iData.state,
        iData.id,
        new Date(iData.created_at),
      );
    }

    bData.sort((a, b) => {
      if (a.position > b.position) {
        return 1;
      }
      if (a.position < b.position) {
        return -1;
      }
      return 0;
    }).forEach((b) => {
      frame.addButton(NewButton(
        fData.id,
        b.position,
        b.action,
        b.target,
        b.content,
        b.post_url,
        b.id,
        new Date(b.created_at),
      ));
    });

    return frame;
  }

  async updateOne(frame: Frame): Promise<void> {
    const res: Response = await fetch(`${API_BASE_URL}/frames/${frame.id}`, {
      method: 'PUT',
      headers: {
        Authorization: this.token,
        'Content-type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: frame.name,
        version: frame.version,
        image: frame.image,
        postUrl: frame.postUrl,
      }),
    });

    const data: ApiResponse<UpdateFrameResponse> = await res.json();

    if (!data.status) {
      throw new UpdateFrameApiError(data.errors);
    }
  }

  async deleteOne(frame: Frame): Promise<void> {
    const res: Response = await fetch(`${API_BASE_URL}/frames/${frame.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: this.token,
        Accept: 'application/json',
      },
    });

    const data: ApiResponse<DeleteFrameResponse> = await res.json();

    if (!data.status) {
      throw new DeleteFrameApiError(data.errors);
    }
  }
}
