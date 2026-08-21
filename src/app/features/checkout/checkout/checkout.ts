import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { ValidationErrors } from '@angular/forms';

import { CarrinhoService } from '../../../core/services/carrinho.service';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import { MatButtonModule } from '@angular/material/button';
import { PedidoFinalizado } from '../../../core/models/pedido-finalizado';
import { email } from '@angular/forms/signals';

@Component({
  selector: 'app-checkout',

  imports: [
    ReactiveFormsModule,
    PrecoFormatadoPipe,
    MatButtonModule
  ],

  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  PedidoFinalizado = signal<PedidoFinalizado | null>(null);

  carrinhoService = inject(CarrinhoService);

  compraFinalizada = signal(false);

  formulario = new FormGroup({

    nome: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      nomeSemNumeros
    ]),

    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),

    endereco: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ])

  });

  finalizar() {

    this.compraFinalizada.set(false);

    if (this.carrinhoService.carrinhoVazio()) {

      console.log(
        'Não é possível finalizar a compra com o carrinho vazio'
      );

      return;
    }

    if (this.formulario.invalid) {

      console.log('Formulário Inválido!');

      this.formulario.markAllAsTouched();

      return;
    }

    const dados = this.formulario.value;

    // CORRETO
    const itens = this.carrinhoService.itens();

    // CORRETO
    const total = this.carrinhoService.totalItens();

    const pedido ={
      codigo: Date.now(),
      cliente: dados.nome ??'',
      email:dados.email ??'',
      quantidadeItens: itens.length,
      total,
      itens,
    }

    console.log('Compra finalizada com sucesso!');
    console.log('Dados do Formulario: ', dados);
    console.log('Dados do pedido: ', pedido);

    this.carrinhoService.limpar();
    this.formulario.reset();
    this.compraFinalizada.set(true);
    this.PedidoFinalizado.set;
  }
}

function nomeSemNumeros(
  controle: AbstractControl
): ValidationErrors | null {

  const valor = controle.value;

  if (!valor) {
    return null;
  }

  if (/\d/.test(valor)) {
    return {
      numeroInvalido: true
    };
  }

  return null;
}