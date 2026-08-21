import { Injectable, inject } from '@angular/core';
import { CarrinhoService } from '../services/carrinho.service';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoFacade {

  private carrinhoService = inject(CarrinhoService);

  itens = this.carrinhoService.itens;
  quantidadeItens = this.carrinhoService.quantidadeItens;
  totalItens = this.carrinhoService.totalItens;
  carrinhoVazio = this.carrinhoService.carrinhoVazio;
  quantidadeCarrinho: any;

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