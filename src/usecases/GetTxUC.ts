export default class GetTxUC implements GetTxInPort {
  constructor(
    protected txRepo: TxRepository,
    protected presenter: GetTxOutPort,
  ) {}

  async execute({ id }: GetTxIn): Promise<void> {
    return this.presenter.present({
      tx: await this.txRepo.findOne(id),
    });
  }
}
