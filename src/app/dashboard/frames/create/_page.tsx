'use client';

import React, { useCallback, useRef, useState } from 'react';
import {
  Button as ButtonUI,
  Card, CardBody, CardFooter, CardHeader, Input, Select, SelectItem,
} from '@nextui-org/react';
import { useAuth } from '@/app/providers/auth';
import CreateFrameUC from '@/usecases/CreateFrameUC';
import FrameApiRepository from '@/repositories/FrameApiRepository';
import { useRouter } from 'next/navigation';
import navigation from '@/app/lib/navigation';

export default function CreateFrameForm() {
  const router = useRouter();
  const { token } = useAuth();
  const name = useRef<HTMLInputElement>(null);
  const image = useRef<HTMLInputElement>(null);
  const version = useRef<HTMLSelectElement>(null);
  const postUrl = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<CreateFrameErrorPayload>({});

  const createFrame = useCallback(async () => {
    setErrors({});
    const presenter: CreateFrameOutPort = {
      present(out: CreateFrameOut): Promise<void> | void {
        router.push(navigation.EDIT_FRAME.replace(':frame', out.frame.id as string));
      },
    };
    const frameRepo = new FrameApiRepository(token as string);
    new CreateFrameUC(frameRepo, presenter).execute({
      name: name.current?.value as string,
      image: image.current?.value as string,
      version: version.current?.value as string,
      postUrl: postUrl.current?.value,
    }).catch((e: CreateFrameErrorPort) => { setErrors(e.payload || {}); });
  }, [router, token]);

  const removeError = useCallback((k: keyof CreateFrameErrorPayload) => () => {
    setErrors(({ [k]: _, ...r }) => r);
  }, []);

  return (
    <Card>
      <CardHeader>
        <h1 className="text-xl font-medium">Create Frame</h1>
      </CardHeader>
      <CardBody>
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <Input
              label="Name *"
              placeholder="Enter name"
              ref={name}
              isInvalid={Boolean(errors.name)}
              errorMessage={errors.name?.[0]}
              onChange={removeError('name')}
            />
            <Input
              label="Image *"
              placeholder="Enter image"
              ref={image}
              isInvalid={Boolean(errors.image)}
              errorMessage={errors.image?.[0]}
              onChange={removeError('image')}
            />
            <Select
              label="Version *"
              placeholder="Select a version"
              selectedKeys={['vNext']}
              ref={version}
              isInvalid={Boolean(errors.version)}
              errorMessage={errors.version?.[0]}
              onChange={removeError('version')}
            >
              <SelectItem key="vNext">vNext</SelectItem>
            </Select>
            <Input
              label="Post url"
              placeholder="Enter post url"
              ref={postUrl}
              isInvalid={Boolean(errors.postUrl)}
              errorMessage={errors.postUrl?.[0]}
              onChange={removeError('postUrl')}
              isDisabled
            />
          </div>
        </div>
      </CardBody>
      <CardFooter>
        <ButtonUI color="primary" onPress={createFrame}>Create</ButtonUI>
      </CardFooter>
    </Card>
  );
}
