import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AtendimentoService } from '../shared/atendimentos.service';
import { TipoAtendimento } from '../shared/model';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements OnInit {
  public atendimentoForm: FormGroup;
  public tiposAtendimento: TipoAtendimento[] = [
    {
      prioridade: 1,
      descricao: 'Gestantes, Idosos ou Pessoas com deficiência',
      classificacao: 'Prioridade Máxima',
    },
    {
      prioridade: 2,
      descricao: 'Encaminhamento Médico',
      classificacao: 'Prioridade Média',
    },
    {
      prioridade: 3,
      descricao: 'Casos Gerais',
      classificacao: 'Prioridade Baixa',
    },
  ];

  constructor(
    private fb: FormBuilder,
    private atendimentoService: AtendimentoService
  ) {
    this.atendimentoForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.atendimentoForm = this.fb.group({
      nome: ['', [Validators.required]],
      tipoAtendimento: [null, Validators.required],
    });
  }

  submit() {
    let atendimento = Object.assign({}, this.atendimentoForm.value);
    this.atendimentoService.addAtendimento(atendimento);
    this.atendimentoForm.reset();
  }

  cancel() {
    this.atendimentoForm.reset();
  }
}
