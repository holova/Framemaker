import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { useAuth } from '@/app/providers/auth';
import ButtonApiRepository from '@/repositories/ButtonApiRepository';
import CreateButtonUC from '@/usecases/CreateButtonUC';
import { Select, SelectItem, useDisclosure } from '@nextui-org/react';
import { Input as InputUI } from '@nextui-org/input';
import { Button as ButtonUI } from '@nextui-org/button';
import { MinusIcon } from '@heroicons/react/24/outline';
import DeleteModal from '@/app/dashboard/frames/[frame]/components/DeleteModal';
import { NewButton } from '@/domains';
import UpdateButtonUC from '@/usecases/UpdateButtonUC';

type OnSaveCallback = () => void;
type FrameButtonProps = {
  button: Button;
  setOnSaveCallback(fn: OnSaveCallback): void;
  onDelete(): Promise<void>;
  isLoading: boolean;
};

export default function FrameButton({
  button, setOnSaveCallback, onDelete, isLoading,
}: FrameButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { token } = useAuth();
  const action = useRef<HTMLSelectElement>(null);
  const target = useRef<HTMLInputElement>(null);
  const content = useRef<HTMLInputElement>(null);
  const postUrl = useRef<HTMLInputElement>(null);
  const [updated, setUpdated] = useState(false);
  const [errors, setErrors] = useState<CreateButtonErrorPayload>({});

  const createButton = useCallback(async () => new Promise<Button>((resolve) => {
    const presenter: CreateButtonOutPort = {
      present(out: CreateButtonOut): Promise<void> | void {
        resolve(out.button);
        setUpdated(false);
      },
    };
    const buttonRepo = new ButtonApiRepository(token as string);
    new CreateButtonUC(buttonRepo, presenter).execute({
      frameId: button.frameId,
      position: button.position,
      action: action.current?.value as ButtonAction,
      target: target.current?.value as string,
      content: content.current?.value as string,
      postUrl: postUrl.current?.value,
    }).catch((e: CreateButtonErrorPort) => { setErrors(e.payload); });
  }), [token]);

  const updateButton = useCallback(async () => new Promise<Button>((resolve) => {
    const newButton = NewButton(
      button.frameId,
      button.position,
      action.current?.value as ButtonAction,
      target.current?.value as string,
      content.current?.value as string,
      postUrl.current?.value,
      button.id,
      button.createdAt,
    );
    const presenter: UpdateButtonOutPort = {
      present(): Promise<void> | void {
        resolve(newButton);
        setUpdated(false);
      },
    };
    const buttonRepo = new ButtonApiRepository(token as string);
    new UpdateButtonUC(buttonRepo, presenter).execute({ button: newButton })
      .catch((e: UpdateButtonErrorPort) => { setErrors(e.payload); });
  }), [token]);

  useEffect(() => {
    if (!button.id) {
      setOnSaveCallback(createButton);
      return;
    }
    if (button.id && updated) {
      setOnSaveCallback(updateButton);
      return;
    }
    setOnSaveCallback(() => {});
  }, [createButton, updateButton, updated]);

  const removeError = useCallback((k: keyof CreateButtonErrorPayload) => {
    setErrors(({ [k]: _, ...r }) => r);
  }, []);

  return (
    <div className="flex gap-3">
      <Select
        label="Action *"
        placeholder="Select an action"
        ref={action}
        defaultSelectedKeys={[button.action]}
        disabledKeys={['mint', 'post_redirect', 'tx']}
        onChange={() => {
          removeError('action');
          setUpdated(true);
        }}
        isInvalid={Boolean(errors.action)}
        errorMessage={errors.action?.[0]}
      >
        <SelectItem key="post">post</SelectItem>
        <SelectItem key="post_redirect">post_redirect</SelectItem>
        <SelectItem key="link">link</SelectItem>
        <SelectItem key="mint">mint</SelectItem>
        <SelectItem key="tx">tx</SelectItem>
      </Select>
      <InputUI
        label="Target *"
        placeholder="Enter target"
        ref={target}
        defaultValue={button.target}
        onChange={() => {
          removeError('target');
          setUpdated(true);
        }}
        isInvalid={Boolean(errors.target)}
        errorMessage={errors.target?.[0]}
        isDisabled={action.current?.value === 'tx'}
      />
      <InputUI
        label="Content *"
        placeholder="Enter content"
        ref={content}
        defaultValue={button.content}
        onChange={() => {
          removeError('content');
          setUpdated(true);
        }}
        isInvalid={Boolean(errors.content)}
        errorMessage={errors.content?.[0]}
      />
      <InputUI
        label="Post Url"
        placeholder="Enter post url"
        ref={postUrl}
        defaultValue={button.postUrl}
        onChange={() => {
          removeError('postUrl');
          setUpdated(true);
        }}
        isInvalid={Boolean(errors.postUrl)}
        errorMessage={errors.postUrl?.[0]}
        isDisabled={action.current?.value !== 'tx'}
      />
      <ButtonUI isIconOnly color="danger" size="sm" onPress={onOpen} className="mt-3">
        <MinusIcon className="size-4" />
      </ButtonUI>
      <DeleteModal isOpen={isOpen} onClose={onClose} onDelete={onDelete} isLoading={isLoading}>
        <p>Are you sure you want to delete the button?</p>
      </DeleteModal>
    </div>
  );
}
