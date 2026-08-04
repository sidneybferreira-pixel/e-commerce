import { Component } from '@angular/core';
import { Produto } from '../produto/produto';
import { signal } from '@angular/core';
import { computed } from '@angular/core';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import { effect } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { produtosService } from '../ptodutos.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-lista-produtos',
  imports: [Produto, PrecoFormatadoPipe, UpperCasePipe],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
  //lista com dados - Array
  produtos = signal<{nome: string; preco: number}[]>([]);
  carregando = signal (true);
  //!Função para exibir produtos selecionados pelo usuário no console
  exibirProduto (nome: string){
    console.log('Produto Selecionado: ', nome);
    this.produtoSelecionado.set(nome);
  } 
  //! função que adiciona produto usando método update()
  adicionarProduto(){
    this.produtos.update(listaAtual => [
      ...listaAtual,
      {nome:'Playstation 5', preco:3000},
    ]);
  }
  //! função que contabiliza a quantidade de produtos na lista
  totalProdutos = computed(() => this.produtos().length);
  //!função que calcula o valor total do produto usando o método cumputed()
  valorTotal = computed(() =>
  {return this.produtos().reduce((total, item) =>
  total + item.preco,0  
  )}
);
//!função que substitui a lista atual usando o método set ()
substituirProduto(){
  this.produtos.set([
    {nome:'Teclado', preco:229.99},
    {nome: 'Mouse', preco: 129.99},
    {nome: 'Monitor', preco: 2000},
    {nome: 'Desktop', preco: 4999.99},
    {nome: 'Headset', preco: 500},
  ]);
}
//! método para monitorar alterações em tempo real usando effect ()
constructor(){
  
  this.carregarProdutos();
  
  effect(() =>{
    console.log('Lista de Produtos Alterados: ', this.produtos());
  });
  effect(() =>{
    console.log('Valor Total Atualizado: ', this.valorTotal());
  });
  effect(() =>{
    if (typeof document !== 'undefined'){
      document.title = `(${this.totalProdutos()}) - Loja do Sidney`;
    }
  });
}
//! Método para criar um estado de seleção com signal string | null
produtoSelecionado = signal <string | null>(null);
//! método para criar um estado para carrinho com signal
carrinho = signal <{nome: string; preco: number}[]>([]);
adicionarAoCarrinho(produto:{nome: string; preco: number}){
  this.carrinho.update(listaAtual =>[
    ...listaAtual,produto
  ]);
}
//totalProduto = computed(() => this.produtos().length);
//metodo para calcular a quantidade total de itens no carrinho
quantidadeCarrinho = computed(() => this.carrinho().length);
//metodo para calcular o valor total dos itens do carrinho]
totalCarrinho = computed(() => {
  return this.carrinho().reduce((total, item) =>
  total + item.preco,0)});

  carregarProdutos(){
    this.carregando.set(true);
    this.produtosService.buscarProdutos().subscribe({
    next: (dados) =>{
      const produtos = this.produtosService.transformarProdutos(dados);
      this.produtos.set(produtos);
      this.carregando.set(false);
    },
    error: (error) =>{
      console.error('Erro ao carregar produtos', error);
      this.carregando.set(false);
    }
  });

  }

  private produtosService = inject(produtosService);

}
