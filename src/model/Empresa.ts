export class Empresa {
  public nome: string;
  public tecnologias: string;
  public endereco: string;
  public latitude: number;
  public longitude: number;
  public urlFoto: string;
  constructor(
    nome: string,
    tecnologias: string,
    endereco: string,
    latitude: number,
    longitude: number,
    urlFoto: string,
  ) {
    this.nome = nome;
    this.tecnologias = tecnologias;
    this.endereco = endereco;
    this.latitude = latitude;
    this.longitude = longitude;
    this.urlFoto = urlFoto;
  }
}
