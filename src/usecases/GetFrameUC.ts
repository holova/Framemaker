export default class GetFrameUC implements GetFrameInPort {
  constructor(
    protected frameRepo: FrameRepository,
    protected presenter: GetFrameOutPort,
  ) {}

  async execute({ id }: GetFrameIn): Promise<void> {
    return this.presenter.present({
      frame: await this.frameRepo.findOne(id),
    });
  }
}
