export class Atendimento {
  nome!: string;
  tipoAtendimento!: TipoAtendimento;
}

export class TipoAtendimento {
  prioridade!: number;
  descricao!: string;
  classificacao!: string;
}
