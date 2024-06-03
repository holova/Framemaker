import { z } from 'zod';
import UpdateButtonValidationError from '@/errors/UpdateButtonValidationError';

export default class UpdateButtonUC implements UpdateButtonInPort {
  constructor(
    protected buttonRepo: ButtonRepository,
    protected presenter: UpdateButtonOutPort,
  ) {}

  async execute({ button }: UpdateButtonIn): Promise<void> {
    const validatedFields = z.object({
      id: z.string({ required_error: 'The id field is required' }).uuid(),
      position: z.number().min(1).max(4),
      action: z.enum(['post', 'post_redirect', 'link', 'mint', 'tx']),
      target: z
        .string({ required_error: 'The target field is required' })
        .min(1, 'The target field is required')
        .url()
        .trim(),
      content: z
        .string({ required_error: 'The content field is required' })
        .min(1, 'The content field is required')
        .trim(),
      postUrl: z.string().url().nullish(),
    }).safeParse({
      id: button.id,
      position: button.position,
      action: button.action,
      target: button.target,
      content: button.content,
      postUrl: button.postUrl || null,
    });

    if (!validatedFields.success) {
      throw new UpdateButtonValidationError(validatedFields.error.flatten().fieldErrors);
    }

    await this.buttonRepo.updateOne(button);

    return this.presenter.present({});
  }
}
