import { z } from 'zod';
import { NewFrame } from '@/domains/Frame';
import CreateDelegateFrameValidationError from '@/errors/CreateDelegateFrameValidationError';
import { NewButton } from '@/domains';
import { NewTx } from '@/domains/Tx';
import { PUBLIC_BASE_URL } from '@/app/constants';

export default class CreateDelegateFrameUC implements CreateDelegateFrameInPort {
  constructor(
    protected frameRepo: FrameRepository,
    protected buttonRepo: ButtonRepository,
    protected txRepo: TxRepository,
    protected presenter: CreateDelegateFrameOutPort,
  ) {}

  async execute({
    frame: { name, image },
    button: { postUrl, content },
    tx: {
      type, chainId, method, address, functionName, args,
    },
  }: CreateDelegateFrameIn): Promise<void> {
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
      postUrl: z.string().url().nullish(),
      content: z
        .string({ required_error: 'The content field is required' })
        .min(1, 'The content field is required')
        .trim(),
    }).safeParse({
      name, image, postUrl, content,
    });

    if (!validatedFields.success) {
      throw new CreateDelegateFrameValidationError(validatedFields.error.flatten().fieldErrors);
    }

    const frame = await this.frameRepo.create(NewFrame(name, image));
    const tx = await this.txRepo.create(NewTx(
      type,
      chainId,
      method,
      address,
      functionName,
      args,
    ));

    const targetUrl = new URL(`${PUBLIC_BASE_URL}/tx/${tx.id}`);

    await this.buttonRepo.create(NewButton(frame.id as string, 1, 'tx', targetUrl.toString(), content, postUrl));

    return this.presenter.present({
      frame,
    });
  }
}
