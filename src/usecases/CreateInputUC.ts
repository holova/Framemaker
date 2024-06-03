import { NewInput } from '@/domains/Input';
import { z } from 'zod';
import CreateInputValidationError from '@/errors/CreateInputValidationError';

export default class CreateInputUC implements CreateInputInPort {
  constructor(
    protected inputRepo: InputRepository,
    protected presenter: CreateInputOutPort,
  ) {}

  async execute({
    frameId,
    text,
    aspectRatio,
    state,
  }: CreateInputIn): Promise<void> {
    const validatedFields = z.object({
      frameId: z.string({ required_error: 'The frame id is required' }).uuid(),
      text: z
        .string({ required_error: 'The text field is required' })
        .min(1, 'The text field is required')
        .trim(),
      aspectRatio: z.enum(['1.91:1', '1:1']),
      state: z.string().url().nullish(),
    }).safeParse({
      frameId,
      text,
      aspectRatio,
      state,
    });

    if (!validatedFields.success) {
      throw new CreateInputValidationError(validatedFields.error.flatten().fieldErrors);
    }

    const button = NewInput(frameId, text, aspectRatio, state);

    return this.presenter.present({ input: await this.inputRepo.create(button) });
  }
}
