import { NewButton } from '@/domains/Button';
import { z } from 'zod';
import CreateButtonValidationError from '@/errors/CreateButtonValidationError';

export default class CreateButtonUC implements CreateButtonInPort {
  constructor(
    protected buttonRepo: ButtonRepository,
    protected presenter: CreateButtonOutPort,
  ) {}

  async execute({
    frameId,
    position,
    action,
    target,
    content,
    postUrl,
  }: CreateButtonIn): Promise<void> {
    const validatedFields = z.object({
      frameId: z.string({ required_error: 'The frame id is required' }).uuid(),
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
      frameId,
      position,
      action,
      target,
      content,
      postUrl: postUrl || null,
    });

    if (!validatedFields.success) {
      throw new CreateButtonValidationError(validatedFields.error.flatten().fieldErrors);
    }

    const button = NewButton(frameId, position, action, target, content, postUrl);

    return this.presenter.present({ button: await this.buttonRepo.create(button) });
  }
}
