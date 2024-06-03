type ApiResponse<D> = {
  status: boolean,
  data: D,
  errors: string[]
};

// type UserFilters = {
//   id?: UserId;
//   address?: Address;
//   username?: string;
// };
//
// interface UserRepository {
//   find(
//     filter: UserFilters,
//     take: number,
//     skip: number,
//   ): Promise<{ items: User[], count: number }>
//   create(user: User): Promise<void>;
//   findOne(filter: UserFilters): Promise<User | null>
//   updateOne(user: User): Promise<void>
// }

type FrameFilters = {
  id?: FrameId;
};

type FrameFindResponse = {
  items: Frame[];
  count: number;
};

interface FrameRepository {
  find(
    filter?: FrameFilters,
    take?: string,
    skip?: string,
  ): Promise<FrameFindResponse>
  create(frame: Frame): Promise<Frame>;
  findOne(frameId: FrameId): Promise<Frame>
  updateOne(frame: Frame): Promise<void>
  deleteOne(frame: Frame): Promise<void>
}

interface ButtonRepository {
  create(button: Button): Promise<Button>;
  updateOne(button: Button): Promise<void>
  deleteOne(button: Button): Promise<void>
}

interface InputRepository {
  create(input: Input): Promise<Input>;
  updateOne(input: Input): Promise<void>
  deleteOne(input: Input): Promise<void>
}

interface TxRepository {
  create(tx: Tx): Promise<Tx>;
  findOne(txId: TxId): Promise<Tx>
}
