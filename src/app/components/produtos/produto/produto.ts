import { Component,Input,Output, EventEmitter, output } from '@angular/core';
import { UpperCasePipe, CurrencyPipe } from '@angular/common';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';

@Component({
  selector: 'app-produto',
  imports: [ UpperCasePipe ,PrecoFormatadoPipe],
  templateUrl: './produto.html',
  styleUrl: './produto.css',
})
//'Cria a classe Produto com as propriedades produto, 
export class Produto {
  //Entrada de dados
  @Input() nome: string ='';
  @Input() preco: number = 0;
  //saida de dados
  @Output() produtoSelecionado = new EventEmitter<string>();
  selecionarProduto(){
    this.produtoSelecionado.emit(this.nome);
  }
}
