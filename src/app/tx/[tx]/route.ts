import { TransactionTargetResponse } from 'frames.js';
import { NextRequest, NextResponse } from 'next/server';
import { Abi, encodeFunctionData } from 'viem';
import TxApiRepository from '@/repositories/TxApiRepository';
import GetTxUC from '@/usecases/GetTxUC';
import GetTxApiError from '@/errors/GetTxApiError';
import GovernanceTokenABI from './GovernanceToken.json';

// eslint-disable-next-line import/prefer-default-export
export async function POST(
  req: NextRequest,
  { params: { tx } }: { params: { tx: string } },
): Promise<NextResponse<TransactionTargetResponse>> {
  try {
    const res = await new Promise<TransactionTargetResponse>((resolve, reject) => {
      const presenter: GetTxOutPort = {
        present(out: GetTxOut): Promise<void> | void {
          if (out.tx.type !== 'delegate') {
            throw new GetTxApiError(['tx.unknown_type']);
          }

          const calldata = encodeFunctionData({
            abi: GovernanceTokenABI,
            functionName: 'delegate',
            args: out.tx.args,
          });

          resolve({
            chainId: out.tx.chainId,
            method: out.tx.method,
            params: {
              abi: GovernanceTokenABI as Abi,
              to: out.tx.address,
              data: calldata,
              value: '0',
            },
          });
        },
      };
      const txRepo = new TxApiRepository();
      new GetTxUC(txRepo, presenter).execute({ id: tx }).catch(reject);
    });

    return NextResponse.json(res);
  } catch (e: any) {
    return NextResponse.json(e.payload, { status: 500 });
  }
}
