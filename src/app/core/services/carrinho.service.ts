import { isPlatformBrowser } from '@angular/common';
import {
  Injectable,
  signal,
  computed,
  effect,
  inject,
  PLATFORM_ID
} from '@angular/core';

import { ItemCarrinho } from '../models/item-carrinho';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {

  private platformId = inject;

  private readonly chaveStorage = 'minha-loja-carrinho';

  private carrinho = signal<ItemCarrinho[]>(
    this.carregarCarrinhoSalvo()
  );

  // SELECTORS
  itens = computed(() => this.carrinho());

  quantidadeItens = computed(() =>
    this.carrinho().length
  );

  totalItens = computed(() =>
    this.carrinho().reduce(
      (total, item) => total + item.preco,
      0
    )
  );

  carrinhoVazio = computed(() =>
    this.carrinho().length === 0
  );
  quantidadeCarrinho: any;
  totalCarrinho: any;

  constructor() {
    effect(() => {
      this.salvarCarrinho(this.carrinho());
    });
  }

  // ACTIONS
  adicionar(produto: ItemCarrinho) {
    this.carrinho.update((lista) => [
      ...lista,
      produto
    ]);
  }

  removerItem(indice: number) {
    this.carrinho.update((listaAtual) =>
      listaAtual.filter(
        (_, index) => index !== indice
      )
    );
  }

  limpar() {
    this.carrinho.set([]);
  }

  private estaNoNavegador(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private carregarCarrinhoSalvo(): ItemCarrinho[] {
    if (!this.estaNoNavegador()) {
      return [];
    }

    const dadosSalvos =
      localStorage.getItem(this.chaveStorage);

    if (!dadosSalvos) {
      return [];
    }

    try {
      return JSON.parse(dadosSalvos) as ItemCarrinho[];
    } catch {
      return [];
    }
  }

  private salvarCarrinho(itens: ItemCarrinho[]) {
    if (!this.estaNoNavegador()) {
      return;
    }

    localStorage.setItem(
      this.chaveStorage,
      JSON.stringify(itens)
    );
  }
}
