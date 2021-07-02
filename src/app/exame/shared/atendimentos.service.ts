import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Atendimento } from './model';

@Injectable()
export class AtendimentoService {
  static modificouListaAtendimento = new EventEmitter<Atendimento>();

  private atendimentos: Atendimento[] = [];

  private apiUrl = 'http://localhost:8080/atendimentos';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getAtendimentos() {
    return this.atendimentos;
  }

  deletarAtendimento() {
    const atendimentoDeletado = this.atendimentos.shift();
    this.httpClient.post<any>(
      this.apiUrl,
      atendimentoDeletado,
      this.httpOptions
    ).subscribe(result => {});

    AtendimentoService.modificouListaAtendimento.emit(atendimentoDeletado);
  }

  addAtendimento(novoAtendimento: Atendimento) {
    this.inserirFila(novoAtendimento);
    AtendimentoService.modificouListaAtendimento.emit(novoAtendimento);
  }

  inserirFila(novoAtendimento: Atendimento) {
    let qtd: number = this.atendimentos.length - 1;
    let i = 0;

    while (
      i <= qtd &&
      novoAtendimento.tipoAtendimento.prioridade >=
        this.atendimentos[i].tipoAtendimento.prioridade
    ) {
      i++;
    }

    this.atendimentos.splice(i, 0, novoAtendimento);
  }
}
