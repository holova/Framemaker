import React from 'react';
import { Button, types } from 'frames.js/next';
import { frames } from '@/app/[frame]/frames';
import FrameApiRepository from '@/repositories/FrameApiRepository';
import { GetFrameUC } from '@/usecases';

const handleRequest = frames(async (ctx) => new Promise((resolve, reject) => {
  const presenter: GetFrameOutPort = {
    present({ frame }: GetFrameOut): Promise<void> | void {
      resolve({
        image: frame.image,
        buttons: [
          frame.buttons[0] && (
          <Button
            key={frame.buttons[0].id}
            action={frame.buttons[0].action}
            target={frame.buttons[0].target}
          >
            {frame.buttons[0].content}
          </Button>
          ),
          frame.buttons[1] && (
          <Button
            key={frame.buttons[1].id}
            action={frame.buttons[1].action}
            target={frame.buttons[1].target}
          >
            {frame.buttons[1].content}
          </Button>
          ),
          frame.buttons[2] && (
          <Button
            key={frame.buttons[2].id}
            action={frame.buttons[2].action}
            target={frame.buttons[2].target}
          >
            {frame.buttons[2].content}
          </Button>
          ),
          frame.buttons[3] && (
          <Button
            key={frame.buttons[3].id}
            action={frame.buttons[3].action}
            target={frame.buttons[3].target}
          >
            {frame.buttons[3].content}
          </Button>
          ),
        ],
        textInput: frame.input?.text,
      });
    },
  };
  const frameRepo = new FrameApiRepository();
  new GetFrameUC(frameRepo, presenter).execute({ id: ctx.frame }).catch(reject);
}), {
  middleware: [
    (async (ctx, next) => next({ frame: ctx.url.pathname.split('/')[1] })) as types.FramesMiddleware<any, { frame: string }>,
  ],
});

export const GET = handleRequest;

export const POST = handleRequest;
