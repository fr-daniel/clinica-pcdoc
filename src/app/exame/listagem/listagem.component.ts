import { Component, OnInit } from '@angular/core';
import { AtendimentoService } from '../shared/atendimentos.service';
import { Atendimento } from '../shared/model';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css'],
})
export class ListagemComponent implements OnInit {
  displayedColumns: string[] = [
    'nome',
    'descricao',
    'classificacao',
    'atendido',
  ];

  atendimentos: Atendimento[] = [];

  constructor(private atendimentoService: AtendimentoService) {}

  ngOnInit() {
    this.atendimentos = this.atendimentoService.getAtendimentos();

    AtendimentoService.modificouListaAtendimento.subscribe(() => {
      this.atendimentos = [...this.atendimentoService.getAtendimentos()];
    });
  }

  atendido(atendimento: Atendimento) {
    this.atendimentoService.deletarAtendimento();
  }

  getClass(prioridade: number): string {
    switch (prioridade) {
      case 1:
        return 'prioridade-maxima';
      case 2:
        return 'prioridade-media';
      case 3:
        return 'prioridade-baixa';
      default:
        return '';
    }
  }
}
