import React from 'react';
import EditFrameForm from '@/app/dashboard/frames/[frame]/_page';
import { getSession } from '@/app/lib/session';
import FrameApiRepository from '@/repositories/FrameApiRepository';
import GetFrameUC from '@/usecases/GetFrameUC';

async function getData(frameId: string) {
  const token = await getSession();

  return new Promise<Frame>((resolve) => {
    const presenter: GetFrameOutPort = {
      present(out: GetFrameOut): Promise<void> | void {
        resolve(out.frame);
      },
    };
    const frameRepo = new FrameApiRepository(token as string);
    new GetFrameUC(frameRepo, presenter).execute({ id: frameId });
  });
}

export default async function CreateFrame({ params }: { params: { frame: string } }) {
  const frame = await getData(params.frame);
  return (
    <EditFrameForm
      frame={{
        id: frame.id as FrameId,
        name: frame.name,
        userId: frame.userId as UserId,
        version: frame.version,
        image: frame.image,
        postUrl: frame.postUrl,
        createdAt: frame.createdAt as Date,
      }}
      input={frame.input ? {
        id: frame.input.id as InputId,
        text: frame.input.text,
        aspectRatio: frame.input.aspectRatio,
        state: frame.input.state,
        createdAt: frame.input.createdAt as Date,
      } : null}
      buttons={frame.buttons.map((b) => ({
        id: b.id as ButtonId,
        position: b.position,
        action: b.action,
        target: b.target,
        content: b.content,
        postUrl: b.postUrl,
        createdAt: b.createdAt as Date,
      }))}
    />
  );
}
