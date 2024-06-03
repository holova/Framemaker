import { z } from 'zod';
import UpdateFrameValidationError from '@/errors/UpdateFrameValidationError';

export default class UpdateFrameUC implements UpdateFrameInPort {
  constructor(
    protected frameRepo: FrameRepository,
    protected presenter: UpdateFrameOutPort,
  ) {}

  async execute({ frame }: UpdateFrameIn): Promise<void> {
    const validatedFields = z.object({
      id: z.string({ required_error: 'The id field is required' }).uuid(),
      name: z
        .string({ required_error: 'The name field is required' })
        .min(1, 'The name field is required')
        .trim(),
      image: z
        .string({ required_error: 'The image field is required' })
        .min(1, 'The image field is required')
        .url()
        .trim(),
      version: z.enum(['vNext']),
      postUrl: z.string().url().nullish(),
    }).safeParse({
      id: frame.id,
      name: frame.name,
      image: frame.image,
      version: frame.version,
      postUrl: frame.postUrl || null,
    });

    if (!validatedFields.success) {
      throw new UpdateFrameValidationError(validatedFields.error.flatten().fieldErrors);
    }

    await this.frameRepo.updateOne(frame);

    return this.presenter.present({});
  }
}
