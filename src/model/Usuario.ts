import {Curso} from './Curso';
import {Perfil} from './Perfil';

export class Usuario {
  public email: string;
  public nome: string;
  public urlFoto: string;
  public curso: Curso;
  public perfil: Perfil;
  constructor(
    email: string,
    nome: string,
    urlFoto: string,
    curso: Curso,
    perfil: Perfil,
  ) {
    this.email = email;
    this.nome = nome;
    this.urlFoto = urlFoto;
    this.curso = curso;
    this.perfil = perfil;
  }
}
