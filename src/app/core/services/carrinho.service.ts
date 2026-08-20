import { Injectable} from "@angular/core";
import { signal } from "@angular/core";
import { computed } from "@angular/core";

type Itemcarrinho ={
    nome: string;
    preco: number;
}

@Injectable({
    providedIn:'root'
})

export class CarrinhoService {

    //!estado global-criado com sucesso
    private carrinho = signal<Itemcarrinho[]>([]);

    //? seleções
    itensCarrinho = computed(() => this.carrinho());
    quantidadeCarrinho = computed(() => this.carrinho().length);
    totalCarrinho = computed(() =>
    this.carrinho().reduce((total, item) => total + item.preco,0));
    carrinhoVazio = computed(() => this.carrinho().length === 0);

    // TODO :AÇÕES
adicionar(produto:Itemcarrinho){
    this.carrinho.update(lista =>[...lista, produto]);
}
// TODO: ação de limpeza
limpar(){
    this.carrinho.set([]);
}

removerItem(rmvItem: number){
    this.carrinho.update((listaAtual) =>
    listaAtual.filter((_, index) => index !== rmvItem));
}
}
