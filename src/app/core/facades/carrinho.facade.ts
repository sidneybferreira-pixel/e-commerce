import { Injectable, inject } from '@angular/core';

import { CarrinhoService } from '../services/carrinho.service';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoFacade {

  private carrinhoService = inject(CarrinhoService);

  itensCarrinho = this.carrinhoService.itensCarrinho;

  quantidadeCarrinho = this.carrinhoService.quantidadeCarrinho;

  totalCarrinho = this.carrinhoService.totalCarrinho;

  carrinhoVazio = this.carrinhoService.carrinhoVazio;

  adicionar(produto: { nome: string; preco: number }) {
    this.carrinhoService.adicionar(produto);
  }

  removerItem(indice: number) {
    this.carrinhoService.removerItem(indice);
  }

  limpar() {
    this.carrinhoService.limpar();
  }
}