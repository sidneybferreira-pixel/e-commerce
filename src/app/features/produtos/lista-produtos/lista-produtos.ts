import { Component, computed, effect, inject, signal } from '@angular/core';
import { UpperCasePipe } from '@angular/common';

import { Produto } from '../produto/produto';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import { produtosService } from '../../../core/services/ptodutos.service';
import { CarrinhoService } from '../../../core/services/carrinho.service';

@Component({
  selector: 'app-lista-produtos',
  imports: [Produto, PrecoFormatadoPipe, UpperCasePipe],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {

  // Lista de produtos
  produtos = signal<{ nome: string; preco: number }[]>([]);

  // Estado de carregamento
  carregando = signal(true);

  // Produto selecionado
  produtoSelecionado = signal<string | null>(null);

  // Estado de erro
  erro = signal<string | null>(null);

  // Serviços
  private produtosService = inject(produtosService);
  public carrinhoService = inject(CarrinhoService);

  // Quantidade e total do carrinho
  quantidadeCarrinho = this.carrinhoService.quantidadeCarrinho;
  totalCarrinho = this.carrinhoService.totalCarrinho;

  // Quantidade de produtos
  totalprodutos = computed(() => this.produtos().length);

  // Valor total dos produtos
  valorTotal = computed(() =>
    this.produtos().reduce(
      (total, item) => total + item.preco,
      0
    )
  );

  constructor() {

    // Carrega os produtos
    this.carregarProdutos();

    // Monitora alterações na lista
    effect(() => {
      console.log(
        'Lista de produtos alterados: ',
        this.produtos()
      );
    });

    // Monitora alteração do valor total
    effect(() => {
      console.log(
        'Valor Total Atualizado: ',
        this.valorTotal()
      );
    });

    // Atualiza o título da página
    effect(() => {
      if (typeof document !== 'undefined') {
        document.title = `(${this.totalprodutos()}) - Loja do Sidney`;
      }
    });
  }

  // Exibe produto selecionado
  exibirProduto(nome: string) {
    console.log('Produto selecionado:', nome);
    this.produtoSelecionado.set(nome);
  }

  // Adiciona produto usando update()
  adicionarproduto() {
    this.produtos.update(listaAtual => [
      ...listaAtual,
      {
        nome: 'playstation 5',
        preco: 3000
      }
    ]);
  }

  // Substitui a lista usando set()
  substituirproduto() {
    this.produtos.set([
      { nome: 'teclado', preco: 50 },
      { nome: 'mouse', preco: 15 },
      { nome: 'monitor', preco: 500 },
      { nome: 'desktop', preco: 1500 },
      { nome: 'headset', preco: 30 },
    ]);
  }

  // Adiciona produto ao carrinho
  adicionarAoCarrinho(produto: {
    nome: string;
    preco: number;
  }) {
    this.carrinhoService.adicionar(produto);
  }

  // Carrega produtos
  carregarProdutos() {
    this.erro.set(null);
    this.carregando.set(true);

    this.produtosService.buscarProdutos().subscribe({
      next: (dados) => {

        const produtos =
          this.produtosService.TransformarProdutos(dados);

        this.produtos.set(produtos);
        this.carregando.set(false);
      },

      error: (erro) => {
        console.error(
          'Erro ao carregar produtos',
          erro
        );

        this.erro.set(
          'Erro ao carregar produtos. Por favor, tente novamente!'
        );

        this.carregando.set(false);
      }
    });
  }
}