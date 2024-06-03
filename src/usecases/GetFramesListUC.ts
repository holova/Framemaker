import { z } from 'zod';
import GetFramesListValidationError from '@/errors/GetFramesListValidationError';

export default class GetFramesListUC implements GetFramesListInPort {
  constructor(
    protected frameRepo: FrameRepository,
    protected presenter: GetFramesListOutPort,
  ) {}

  async execute({ take, skip }: GetFramesListIn): Promise<void> {
    const validatedFields = z.object({
      take: z.number().gte(0).optional(),
      skip: z.number().gte(0).optional(),
    }).safeParse({ take, skip });

    if (!validatedFields.success) {
      throw new GetFramesListValidationError(validatedFields.error.flatten().fieldErrors);
    }

    return this.presenter.present(await this.frameRepo.find({}, take.toString(), skip.toString()));
  }
}
