'use server';

import { redirect } from 'next/navigation';
import navigation from '@/app/lib/navigation';
import { getSession } from '@/app/lib/session';
import { CreateDelegateFrameUC } from '@/usecases';
import ButtonApiRepository from '@/repositories/ButtonApiRepository';
import FrameApiRepository from '@/repositories/FrameApiRepository';
import TxApiRepository from '@/repositories/TxApiRepository';

export type Chain = 'eip155:1' | 'eip155:42161' | 'eip155:8453' | 'eip155:84532' | 'eip155:666666666' | 'eip155:100' | 'eip155:10' | 'eip155:7777777';
type createDelegateTXData = {
  name: string;
  image: string;
  postUrl: string;
  content: string;
  chainId: Chain;
  args: (string | number)[];
};

// eslint-disable-next-line import/prefer-default-export
export async function createDelegateFrame({
  name, image, postUrl, content, chainId, args,
}: createDelegateTXData) {
  const session = await getSession();

  if (!session) {
    redirect(navigation.LOGIN);
    return;
  }

  const frame = await new Promise<Frame>((resolve, reject) => {
    const presenter: CreateDelegateFrameOutPort = {
      present(out: CreateDelegateFrameOut): Promise<void> | void {
        resolve(out.frame);
      },
    };

    let tx;
    switch (chainId) {
      case 'eip155:42161': // Arbitrum
        tx = {
          type: 'delegate',
          chainId,
          method: 'eth_sendTransaction' as 'eth_sendTransaction',
          address: '0x912ce59144191c1204e64559fe8253a0e49e6548' as `0x${string}`,
          functionName: 'delegate',
          args,
        };
        break;
      case 'eip155:10': // Optimism
      default:
        tx = {
          type: 'delegate',
          chainId,
          method: 'eth_sendTransaction' as 'eth_sendTransaction',
          address: '0x4200000000000000000000000000000000000042' as `0x${string}`,
          functionName: 'delegate',
          args,
        };
    }
    const frameRepo = new FrameApiRepository(session);
    const buttonRepo = new ButtonApiRepository(session as string);
    const txRepo = new TxApiRepository(session);
    new CreateDelegateFrameUC(frameRepo, buttonRepo, txRepo, presenter).execute({
      frame: { name, image },
      button: { postUrl, content },
      tx,
    }).catch(reject);
  });

  redirect(navigation.EDIT_FRAME.replace(':frame', frame.id as string));
}
