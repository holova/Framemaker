'use client';

import React, { useState, ChangeEvent, useCallback } from 'react';
import { Button, Input, Snippet } from '@nextui-org/react';
import { useDebouncedCallback } from 'use-debounce';
import { useAuth } from '@/app/providers/auth';
import FrameApiRepository from '@/repositories/FrameApiRepository';
import { CreateFrameUC } from '@/usecases';
import Link from 'next/link';

export default function LandingForm() {
  const { token } = useAuth();
  const [url, setUrl] = useState<string>();
  const [image, setImage] = useState<string>();
  const [error, setError] = useState<string | null>(null);
  const [frame, setFrame] = useState<Frame>();
  const [isLoading, setLoading] = useState(false);

  const onChange = useDebouncedCallback(async ({ target }: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setUrl(target.value);
  }, 500);

  const onSubmit = useCallback(async () => {
    if (error || !image) return;
    setLoading(true);
    const presenter: CreateFrameOutPort = {
      present(out: CreateFrameOut): Promise<void> | void {
        setFrame(out.frame);
        setLoading(false);
      },
    };
    const frameRepo = new FrameApiRepository(token);
    new CreateFrameUC(frameRepo, presenter).execute({
      name: Date.now().toString(),
      image,
      version: 'vNext',
    }).catch((e) => {
      setError(e.message);
      setLoading(false);
    });
  }, [token, image, error]);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-2">
      <div className="flex w-full max-w-[528px] flex-col justify-center gap-2 pb-3">
        {url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={url}
            alt="Frame screen"
            className="hidden"
            onLoad={() => setImage(url)}
            onError={() => setError('Incorrect image url')}
          />
        )}
        {image && (
          <div
            className="h-[275px] w-[528px] bg-cover bg-center"
            style={{ backgroundImage: `url('${image}')` }}
          />
        )}
        <div className="flex w-full gap-2 light">
          <Input
            size="lg"
            placeholder="Enter image url"
            isInvalid={Boolean(error)}
            errorMessage={error}
            onChange={onChange}
          />
          <Button size="lg" className="bg-main text-black" onPress={onSubmit} isLoading={isLoading}>Create</Button>
        </div>
      </div>
      {frame && (
        <>
          <p>Copy url in your cast:</p>
          <div className="flex gap-2">
            <Snippet size="lg" symbol={null}>{frame.publicURL.toString()}</Snippet>
            <Button
              as={Link}
              href={`${frame.warpcastShareURL.toString()}&text=Frame+by+%40mayers`}
              target="_blank"
              size="lg"
              className="bg-main text-black"
            >
              Cast
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
