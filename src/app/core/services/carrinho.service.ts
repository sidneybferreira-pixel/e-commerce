import { Injectable} from "@angular/core";
import { signal } from "@angular/core";
import { computed } from "@angular/core";

@Injectable({
    providedIn:'root'
})

export class CarrinhoService {

    //!estado global-criado com sucesso
    private carrinho = signal<{nome: string; preco: number}[]>([]);

    //? seleções
    itens = computed(() => this.carrinho());
    quantidadeitens = computed(() => this.carrinho().length);
    totalitens = computed(() =>
    this.carrinho().reduce((total, item) => total + item.preco,0));

    // TODO :AÇÕES
adicionar(produto:{nome:string;preco:number}){
    this.carrinho.update(lista =>[...lista, produto]);
}
// TODO: ação de limpeza
limpar(){
    this.carrinho.set([]);
}
}
