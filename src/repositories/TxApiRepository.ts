import { logout } from '@/app/actions/auth';
import CreateButtonApiError from '@/errors/CreateButtonApiError';
import { API_BASE_URL } from '@/app/constants';
import { NewTx } from '@/domains/Tx';
import GetTxApiError from '@/errors/GetTxApiError';

type TxTDO = {
  id: TxId;
  user_id: UserId;
  type: string;
  chain_id: string;
  method: 'eth_sendTransaction';
  address: `0x${string}`;
  function_name: string;
  args: (string | number)[];
  created_at: number;
};

type CreateTxResponse = TxTDO;
type GetTxResponse = TxTDO;

export default class TxApiRepository implements TxRepository {
  constructor(protected token: string = '') {}

  async create(tx: Tx): Promise<Tx> {
    const res: Response = await fetch(`${API_BASE_URL}/txs`, {
      method: 'POST',
      headers: {
        Authorization: this.token,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        type: tx.type,
        chain_id: tx.chainId,
        method: tx.method,
        address: tx.address,
        function_name: tx.functionName,
        args: tx.args,
      }),
    });

    if (res.status === 401) {
      await logout();
    }

    const data: ApiResponse<CreateTxResponse> = await res.json();

    if (!data.status) {
      throw new CreateButtonApiError(data.errors);
    }

    return NewTx(
      data.data.type,
      data.data.chain_id,
      data.data.method,
      data.data.address,
      data.data.function_name,
      data.data.args,
      data.data.id,
      data.data.user_id,
      new Date(data.data.created_at),
    );
  }

  async findOne(txId: TxId): Promise<Tx> {
    const res: Response = await fetch(`${API_BASE_URL}/txs/${txId}`, {
      headers: {
        Authorization: this.token,
        Accept: 'application/json',
      },
    });

    const data: ApiResponse<GetTxResponse> = await res.json();

    if (!data.status) {
      throw new GetTxApiError(data.errors);
    }

    return NewTx(
      data.data.type,
      data.data.chain_id,
      data.data.method,
      data.data.address,
      data.data.function_name,
      data.data.args,
      data.data.id,
      data.data.user_id,
      new Date(data.data.created_at),
    );
  }
}
