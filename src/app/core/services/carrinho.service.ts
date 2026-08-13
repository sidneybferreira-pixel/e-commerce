import { Injectable} from "@angular/core";
import { signal } from "@angular/core";
import { computed } from "@angular/core";

type ItemCarrinho ={
    nome: string;
    preco: number;
}

@Injectable({
    providedIn:'root'
})

export class CarrinhoService {

    //!estado global-criado com sucesso
    private carrinho = signal<ItemCarrinho[]>([]);

    //? seleções
    itens = computed(() => this.carrinho());
    quantidadeitens = computed(() => this.carrinho().length);
    totalitens = computed(() =>
    this.carrinho().reduce((total, item) => total + item.preco,0));
    carrinhoVazio = computed(() => this.carrinho().length === 0);

    // TODO :AÇÕES
adicionar(produto:ItemCarrinho){
    this.carrinho.update(lista =>[...lista, produto]);
}
// TODO: ação de limpeza
limpar(){
    this.carrinho.set([]);
}
}
