export default class DeleteInputUC implements DeleteInputInPort {
  constructor(
    protected inputRepo: InputRepository,
    protected presenter: DeleteInputOutPort,
  ) {}

  async execute({ input }: DeleteInputIn): Promise<void> {
    await this.inputRepo.deleteOne(input);
    return this.presenter.present({});
  }
}
