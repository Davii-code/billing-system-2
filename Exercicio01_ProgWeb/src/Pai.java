public class Pai extends Pessoa {
  private String ocupacao;

  @Override
  public String getTipoVoz() {
    return "Voz brava";
  }

  public String getOcupacao() {
    return ocupacao;
  }

  public void setOcupacao(String ocupacao) {
    this.ocupacao = ocupacao;
  }

  @Override
  public String toString() {
    return super.toString() + ", Ocupação: " + ocupacao;
  }
}
