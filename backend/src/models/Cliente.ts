import { validarCPF } from "../utils/ValidatorCPF";
import validator from "validator";

type ClienteProps = {
  nome: string;
  cpf: string;
  endereco: string;
  celular: string;
  email: string;
  senha: string;
  ativo?: boolean;
};

export class Cliente {
  private nome: string;
  private cpf: string;
  private endereco: string;
  private celular: string;
  private email: string;
  private senha: string;
  private ativo: boolean;

  constructor({ nome, cpf, endereco, celular, email, senha, ativo = true }: ClienteProps) {
    this.nome = this.validarNome(nome);
    this.cpf = this.validarCPF(cpf);
    this.endereco = endereco;
    this.celular = this.validarCelular(celular);
    this.email = this.validarEmail(email);
    this.senha = senha; // O hash será feito na service!
    this.ativo = ativo;
  }

  // Métodos de validação
  private validarNome(nome: string): string {
    if (!nome || nome.length < 3) throw new Error("Nome inválido!");
    return nome;
  }

  private validarCPF(cpf: string): string {
    if (!validarCPF(cpf)) throw new Error("CPF inválido!");
    return cpf;
  }

  private validarCelular(celular: string): string {
    if (!validator.isMobilePhone(celular, ["pt-BR"])) throw new Error("Celular inválido!");
    return celular;
  }

  private validarEmail(email: string): string {
    if (!validator.isEmail(email)) throw new Error("E-mail inválido!");
    return email;
  }

  
  public getNome(): string {
    return this.nome;
  }

  public getCpf(): string {
    return this.cpf;
  }

  public getEmail(): string {
    return this.email;
  }

  public getEndereco(): string {
    return this.endereco;
  }

  public getCelular(): string {
    return this.celular;
  }

  public getSenha(): string {
    return this.senha;
  }

  public isAtivo(): boolean {
    return this.ativo;
  }

  public ativar(): void {
    this.ativo = true;
  }

  public desativar(): void {
    this.ativo = false;
  }
}
