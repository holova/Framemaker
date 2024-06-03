'use client';

import React, { useCallback, useRef, useState } from 'react';
import {
  Card, CardBody, CardFooter, CardHeader,
} from '@nextui-org/card';
import { Input as InputUI } from '@nextui-org/input';
import { Button as ButtonUI } from '@nextui-org/button';
import { createDelegateFrame } from '@/app/actions/createFrame';
import type { Chain } from '@/app/actions/createFrame';
import { Select, SelectItem } from '@nextui-org/react';

export default function CreateDelegateForm() {
  const name = useRef<HTMLInputElement>(null);
  const image = useRef<HTMLInputElement>(null);
  const content = useRef<HTMLInputElement>(null);
  const postUrl = useRef<HTMLInputElement>(null);
  const address = useRef<HTMLInputElement>(null);
  const chainId = useRef<HTMLSelectElement>(null);
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState<CreateDelegateFrameErrorPayload>({});

  const removeError = useCallback((k: keyof CreateDelegateFrameErrorPayload) => () => {
    setErrors(({ [k]: _, ...r }) => r);
  }, []);

  const createFrame = useCallback(async () => {
    setLoading(true);
    setErrors({});

    await createDelegateFrame({
      name: name.current?.value as string,
      image: image.current?.value as string,
      postUrl: postUrl.current?.value as string,
      content: content.current?.value as string,
      chainId: chainId.current?.value as Chain,
      args: [address.current?.value as string],
    }).catch((e: CreateFrameErrorPort) => {
      setLoading(false);
      setErrors(e.payload || {});
    });
  }, []);

  return (
    <Card>
      <CardHeader>
        <h1 className="text-xl font-medium">Create delegate Frame</h1>
      </CardHeader>
      <CardBody>
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <InputUI
              label="Name *"
              placeholder="Enter name"
              ref={name}
              isInvalid={Boolean(errors.name)}
              errorMessage={errors.name?.[0]}
              onChange={removeError('name')}
            />
            <InputUI
              label="Image *"
              placeholder="Enter image"
              ref={image}
              isInvalid={Boolean(errors.image)}
              errorMessage={errors.image?.[0]}
              onChange={removeError('image')}
            />
          </div>

          <h2>Button</h2>
          <div className="flex gap-3">
            <InputUI
              label="Action *"
              value="tx"
              isDisabled
            />
            <Select
              label="Chain *"
              placeholder="Select a chain"
              ref={chainId}
              defaultSelectedKeys={['eip155:42161']}
              onChange={removeError('chainId')}
              isInvalid={Boolean(errors.chainId)}
              errorMessage={errors.chainId?.[0]}
            >
              <SelectItem key="eip155:42161">Arbitrum</SelectItem>
              <SelectItem key="eip155:10">Optimism</SelectItem>
            </Select>
            <InputUI
              label="Content *"
              placeholder="Enter content"
              ref={content}
              defaultValue="Delegate"
              onChange={removeError('content')}
              isInvalid={Boolean(errors.content)}
              errorMessage={errors.content?.[0]}
            />
            <InputUI
              label="Post Url"
              placeholder="Enter a frame after the tx is signed"
              ref={postUrl}
              onChange={removeError('postUrl')}
              isInvalid={Boolean(errors.postUrl)}
              errorMessage={errors.postUrl?.[0]}
            />
            <InputUI
              label="Address"
              placeholder="Enter delegatee address"
              ref={address}
              onChange={removeError('address')}
              isInvalid={Boolean(errors.address)}
              errorMessage={errors.address?.[0]}
            />
          </div>
        </div>
      </CardBody>
      <CardFooter className="gap-2">
        <ButtonUI color="primary" onPress={createFrame} isLoading={isLoading}>Create</ButtonUI>
      </CardFooter>
    </Card>
  );
}
