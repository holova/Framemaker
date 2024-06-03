import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { Input as InputUI } from '@nextui-org/input';
import { Select, SelectItem, useDisclosure } from '@nextui-org/react';
import { Button as ButtonUI } from '@nextui-org/button';
import { MinusIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@/app/providers/auth';
import InputApiRepository from '@/repositories/InputApiRepository';
import CreateInputUC from '@/usecases/CreateInputUC';
import { NewInput } from '@/domains';
import UpdateInputUC from '@/usecases/UpdateInputUC';
import DeleteModal from '@/app/dashboard/frames/[frame]/components/DeleteModal';

type OnSaveCallback = () => void;
type FrameInputProps = {
  input: Input;
  setOnSaveCallback(fn: OnSaveCallback): Promise<void | Input> | void;
  onDelete(): Promise<void>;
  isLoading: boolean;
};

export default function FrameInput({
  input, setOnSaveCallback, onDelete, isLoading,
}: FrameInputProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { token } = useAuth();
  const text = useRef<HTMLInputElement>(null);
  const aspectRatio = useRef<HTMLSelectElement>(null);
  const [updated, setUpdated] = useState(false);
  const [errors, setErrors] = useState<CreateInputErrorPayload>({});

  const createInput = useCallback(async () => new Promise<Input>((resolve) => {
    const presenter: CreateInputOutPort = {
      present(out: CreateInputOut): Promise<void> | void {
        resolve(out.input);
        setUpdated(false);
      },
    };
    const inputRepo = new InputApiRepository(token as string);
    new CreateInputUC(inputRepo, presenter).execute({
      frameId: input.frameId,
      text: text.current?.value as string,
      aspectRatio: aspectRatio.current?.value as InputAspectRatio,
    }).catch((e: CreateButtonErrorPort) => { setErrors(e.payload); });
  }), [token]);

  const updateInput = useCallback(async () => new Promise<Input>((resolve) => {
    const newInput = NewInput(
      input.frameId,
      text.current?.value as string,
      aspectRatio.current?.value as InputAspectRatio,
      input.state,
      input.id,
      input.createdAt,
    );
    const presenter: UpdateInputOutPort = {
      present(): Promise<void> | void {
        resolve(newInput);
        setUpdated(false);
      },
    };
    const inputRepo = new InputApiRepository(token as string);
    new UpdateInputUC(inputRepo, presenter).execute({ input: newInput })
      .catch((e: UpdateInputErrorPort) => { setErrors(e.payload); });
  }), [token]);

  useEffect(() => {
    if (!input.id) {
      setOnSaveCallback(createInput);
      return;
    }
    if (input.id && updated) {
      setOnSaveCallback(updateInput);
      return;
    }
    setOnSaveCallback(() => {});
  }, [createInput, updateInput, updated]);

  const removeError = useCallback((k: keyof CreateInputErrorPayload) => {
    setErrors(({ [k]: _, ...r }) => r);
  }, []);

  return (
    <div className="flex items-center gap-3">
      <InputUI
        label="Text *"
        placeholder="Enter text"
        ref={text}
        defaultValue={input.text}
        onChange={() => {
          removeError('text');
          setUpdated(true);
        }}
        isInvalid={Boolean(errors.text)}
        errorMessage={errors.text?.[0]}
      />
      <Select
        label="Aspect Ratio *"
        placeholder="Select an aspect ratio"
        defaultSelectedKeys={[input.aspectRatio]}
        ref={aspectRatio}
        onChange={() => {
          removeError('aspectRatio');
          setUpdated(true);
        }}
        isInvalid={Boolean(errors.aspectRatio)}
        errorMessage={errors.aspectRatio?.[0]}
        isDisabled
      >
        <SelectItem key="1.91:1">1.91:1</SelectItem>
        <SelectItem key="1:1">1:1</SelectItem>
      </Select>
      <InputUI label="State" placeholder="Enter state" isDisabled />
      <ButtonUI isIconOnly color="danger" size="sm" onPress={onOpen} className="mt-3">
        <MinusIcon className="size-4" />
      </ButtonUI>
      <DeleteModal isOpen={isOpen} onClose={onClose} onDelete={onDelete} isLoading={isLoading}>
        <p>Are you sure you want to delete the button?</p>
      </DeleteModal>
    </div>
  );
}
