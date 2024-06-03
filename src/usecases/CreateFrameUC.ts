import { z } from 'zod';
import { NewFrame } from '@/domains/Frame';
import CreateFrameValidationError from '@/errors/CreateFrameValidationError';

export default class CreateFrameUC implements CreateFrameInPort {
  constructor(
    protected frameRepo: FrameRepository,
    protected presenter: CreateFrameOutPort,
  ) {}

  async execute({
    name, image, version, postUrl,
  }: CreateFrameIn): Promise<void> {
    const validatedFields = z.object({
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
      name, image, version, postUrl: postUrl || null,
    });

    if (!validatedFields.success) {
      throw new CreateFrameValidationError(validatedFields.error.flatten().fieldErrors);
    }

    return this.presenter.present({
      frame: await this.frameRepo.create(NewFrame(name, image, version, postUrl)),
    });
  }
}
