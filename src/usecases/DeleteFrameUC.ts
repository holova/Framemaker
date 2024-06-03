export default class DeleteFrameUC implements DeleteFrameInPort {
  constructor(
    protected frameRepo: FrameRepository,
    protected presenter: DeleteFrameOutPort,
  ) {}

  async execute({ frame }: DeleteFrameIn): Promise<void> {
    await this.frameRepo.deleteOne(frame);
    return this.presenter.present({});
  }
}
