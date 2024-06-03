export class TxDomain implements Tx {
  constructor(
    readonly type: string,
    readonly chainId: string,
    readonly method: 'eth_sendTransaction',
    readonly address: `0x${string}`,
    readonly functionName: string,
    readonly args: (string | number)[],
    readonly id?: TxId,
    readonly userId?: UserId,
    readonly createdAt?: Date,
  ) {
  }
}

export function NewTx(
  type: string,
  chainId: string,
  method: 'eth_sendTransaction',
  address: `0x${string}`,
  functionName: string,
  args: (string | number)[],
  id?: TxId,
  userId?: UserId,
  createdAt?: Date,
): Tx {
  return new TxDomain(
    type,
    chainId,
    method,
    address,
    functionName,
    args,
    id,
    userId,
    createdAt,
  );
}
