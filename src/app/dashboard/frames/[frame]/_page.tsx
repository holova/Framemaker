'use client';

import React, {
  useCallback, useRef, useState,
} from 'react';
import {
  Button as ButtonUI,
  Card, CardBody, CardFooter, CardHeader, Input as InputUI, Select, SelectItem,
} from '@nextui-org/react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { NewFrame } from '@/domains/Frame';
import { useAuth } from '@/app/providers/auth';
import FrameApiRepository from '@/repositories/FrameApiRepository';
import UpdateFrameUC from '@/usecases/UpdateFrameUC';
import { NewButton, NewInput } from '@/domains';
import FrameInput from '@/app/dashboard/frames/[frame]/components/FrameInput';
import FrameButton from '@/app/dashboard/frames/[frame]/components/FrameButton';
import ButtonApiRepository from '@/repositories/ButtonApiRepository';
import DeleteButtonUC from '@/usecases/DeleteButtonUC';
import InputApiRepository from '@/repositories/InputApiRepository';
import DeleteInputUC from '@/usecases/DeleteInputUC';

type EditFrameFormProps = {
  frame: FrameDto
  input: InputDto | null,
  buttons: ButtonDto[]
};

type FrameDto = {
  id: FrameId;
  name: string;
  userId: UserId;
  version: string;
  image: string;
  postUrl?: string;
  createdAt: Date;
};

type InputDto = {
  id: InputId;
  text: string;
  aspectRatio: InputAspectRatio;
  state: string;
  createdAt: Date;
};

type ButtonDto = {
  id: ButtonId;
  position: ButtonPosition;
  action: ButtonAction;
  target: string;
  content: string;
  postUrl?: string;
  createdAt: Date;
};

type InputStore = {
  key: string;
  input: Input;
  callback(): Promise<void | Input> | void;
};

type ButtonStore = {
  key: string;
  button: Button;
  callback(): Promise<void | Button> | void;
};

type OnSaveCallback = () => void;

export default function EditFrameForm({ frame, input, buttons }: EditFrameFormProps) {
  const { token } = useAuth();
  const name = useRef<HTMLInputElement>(null);
  const image = useRef<HTMLInputElement>(null);
  const version = useRef<HTMLSelectElement>(null);
  const postUrl = useRef<HTMLInputElement>(null);
  const [inputForms, setInputForms] = useState<InputStore[]>(
    input ? [{
      key: Date.now().toString(),
      input: NewInput(
        frame.id,
        input.text,
        input.aspectRatio,
        input.state,
        input.id,
        input.createdAt,
      ),
      callback: () => {},
    }] : [],
  );
  const [buttonForms, setButtonForms] = useState<ButtonStore[]>(buttons.map((button) => ({
    key: button.id,
    button: NewButton(
      frame.id,
      button.position,
      button.action,
      button.target,
      button.content,
      button.postUrl,
      button.id,
      button.createdAt,
    ),
    callback: () => {},
  })));
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState<null | string>(null);
  const [errors, setErrors] = useState<UpdateFrameErrorPayload>({});

  const updateFrame = useCallback(async () => {
    setErrors({});
    setMessage(null);
    setLoading(true);
    await Promise.all(buttonForms.map(async ({ key, callback }) => {
      const button = await callback();

      if (!button) return;

      setButtonForms((prevState) => prevState.reduce((acc, cur) => {
        if (cur.key === key) {
          return [
            ...acc,
            {
              key: button.id as string,
              button,
              callback: () => {},
            },
          ];
        }
        return [...acc, cur];
      }, [] as ButtonStore[]));
    }));
    await Promise.all(inputForms.map(async ({ callback }) => {
      const res = await callback();

      if (!res) return;

      setInputForms([{
        key: res.id as string,
        input: res,
        callback: () => {},
      }]);
    }));
    const presenter: UpdateFrameOutPort = {
      present(): Promise<void> | void {
        setMessage('Updated successfully');
        setLoading(false);
      },
    };
    const frameRepo = new FrameApiRepository(token as string);
    new UpdateFrameUC(frameRepo, presenter).execute({
      frame: NewFrame(
        name.current?.value as string,
        image.current?.value as string,
        version.current?.value as string,
        postUrl.current?.value,
        frame.userId,
        frame.id,
        frame.createdAt,
      ),
    }).catch((e: UpdateFrameErrorPort) => {
      setErrors(e.payload || {});
    });
  }, [buttonForms, inputForms, token, frame.userId, frame.id, frame.createdAt]);

  const addInput = useCallback(() => {
    if (inputForms.length) return;

    setInputForms([{
      key: Date.now().toString(),
      input: NewInput(frame.id, '', '1.91:1'),
      callback: () => {},
    }]);
  }, [frame.id, inputForms.length]);

  const removeInput = useCallback(async () => {
    if (!inputForms[0].input.id) {
      setInputForms([]);
      return;
    }
    setLoading(true);

    const presenter: DeleteInputOutPort = {
      present(): Promise<void> | void {
        setInputForms([]);
        setLoading(false);
      },
    };
    const inputRepo = new InputApiRepository(token as string);
    new DeleteInputUC(inputRepo, presenter).execute({ input: inputForms[0].input });
  }, [inputForms, token]);

  const updateCallbackInput = useCallback((callback: OnSaveCallback) => {
    setInputForms((prevState) => [{
      key: prevState[0].key,
      input: prevState[0].input,
      callback,
    }]);
  }, []);

  const addButton = useCallback(() => {
    if (buttonForms.length >= 4) return;

    setButtonForms((prevState) => ([...prevState, {
      key: Date.now().toString(),
      button: NewButton(
        frame.id,
        buttonForms.length + 1 as ButtonPosition,
        'post',
        '',
        '',
      ),
      callback: () => {},
    }]));
  }, [buttonForms.length, frame.id]);

  const removeButton = useCallback((button: ButtonStore) => async () => {
    if (!button.button.id) {
      setButtonForms((prevState) => (prevState.filter(({ key }) => key !== button.key)));
      return;
    }

    setLoading(true);

    const presenter: DeleteButtonOutPort = {
      present(): Promise<void> | void {
        setButtonForms((prevState) => (prevState.filter(({ key }) => key !== button.key)));
        setLoading(false);
      },
    };
    const buttonRepo = new ButtonApiRepository(token as string);
    new DeleteButtonUC(buttonRepo, presenter).execute({ button: button.button });
  }, [token]);

  const updateCallbackButton = useCallback((k: string) => (callback: OnSaveCallback) => {
    setButtonForms((prevState) => prevState.reduce((acc, cur) => {
      if (cur.key === k) {
        return [
          ...acc,
          {
            key: cur.key,
            button: cur.button,
            callback,
          },
        ];
      }
      return [...acc, cur];
    }, [] as ButtonStore[]));
  }, []);

  const removeError = useCallback((k: keyof CreateFrameErrorPayload) => () => {
    setErrors(({ [k]: _, ...r }) => r);
  }, []);

  return (
    <Card>
      <CardHeader>
        <h1 className="text-xl font-medium">Edit Frame</h1>
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
              defaultValue={frame.name}
            />
            <InputUI
              label="Image *"
              placeholder="Enter image"
              ref={image}
              isInvalid={Boolean(errors.image)}
              errorMessage={errors.image?.[0]}
              onChange={removeError('image')}
              defaultValue={frame.image}
            />
            <Select
              label="Version *"
              placeholder="Select a version"
              selectedKeys={[frame.version]}
              ref={version}
              isInvalid={Boolean(errors.version)}
              errorMessage={errors.version?.[0]}
              onChange={removeError('version')}
            >
              <SelectItem key="vNext">vNext</SelectItem>
            </Select>
            <InputUI
              label="Post url"
              placeholder="Enter post url"
              ref={postUrl}
              isInvalid={Boolean(errors.postUrl)}
              errorMessage={errors.postUrl?.[0]}
              onChange={removeError('postUrl')}
              defaultValue={frame.postUrl}
              isDisabled
            />
          </div>

          <div className="flex items-center gap-3">
            <h2>Input</h2>
            <ButtonUI isIconOnly variant="light" size="sm" onPress={addInput} isDisabled={inputForms.length > 0}>
              <PlusIcon className="size-4" />
            </ButtonUI>
          </div>
          {inputForms.map((val) => (
            <FrameInput
              key={val.key}
              input={val.input}
              onDelete={removeInput}
              setOnSaveCallback={updateCallbackInput}
              isLoading={isLoading}
            />
          ))}

          <div className="flex items-center gap-3">
            <h2>Buttons</h2>
            <ButtonUI isIconOnly variant="light" size="sm" onPress={addButton} isDisabled={buttons.length >= 4}>
              <PlusIcon className="size-4" />
            </ButtonUI>
          </div>
          {buttonForms.map((val) => (
            <FrameButton
              key={val.key}
              button={val.button}
              onDelete={removeButton(val)}
              setOnSaveCallback={updateCallbackButton(val.key)}
              isLoading={isLoading}
            />
          ))}
        </div>
      </CardBody>
      <CardFooter className="gap-2">
        <ButtonUI color="primary" onPress={updateFrame} isLoading={isLoading}>Update</ButtonUI>
        {message && <p className="text-xs text-green-700">{message}</p>}
      </CardFooter>
    </Card>
  );
}
