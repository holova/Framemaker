export default class DeleteButtonUC implements DeleteButtonInPort {
  constructor(
    protected buttonRepo: ButtonRepository,
    protected presenter: DeleteButtonOutPort,
  ) {}

  async execute({ button }: DeleteButtonIn): Promise<void> {
    await this.buttonRepo.deleteOne(button);
    return this.presenter.present({});
  }
}
