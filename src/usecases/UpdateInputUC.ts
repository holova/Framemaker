import { z } from 'zod';
import UpdateInputValidationError from '@/errors/UpdateInputValidationError';

export default class UpdateInputUC implements UpdateInputInPort {
  constructor(
    protected inputRepo: InputRepository,
    protected presenter: UpdateInputOutPort,
  ) {}

  async execute({ input }: UpdateInputIn): Promise<void> {
    const validatedFields = z.object({
      id: z.string({ required_error: 'The id field is required' }).uuid(),
      text: z
        .string({ required_error: 'The text field is required' })
        .min(1, 'The text field is required')
        .trim(),
      aspectRatio: z.enum(['1.91:1', '1:1']),
      state: z.string().nullish(),
    }).safeParse({
      id: input.id,
      text: input.text,
      aspectRatio: input.aspectRatio,
      state: input.state,
    });

    if (!validatedFields.success) {
      throw new UpdateInputValidationError(validatedFields.error.flatten().fieldErrors);
    }

    await this.inputRepo.updateOne(input);

    return this.presenter.present({});
  }
}
