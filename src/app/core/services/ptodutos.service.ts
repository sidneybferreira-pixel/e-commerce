import { inject, Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";

type produtoApi = {

    title: string;
    price: number;
};
type produto ={

    nome: string;
    preco: number;
};

@Injectable ({providedIn: 'root'})

export class produtosService{
    private http = inject(HttpClient);
    private API = 'https://fakestoreapi.com/products';

    buscarProdutos(){
        return this.http.get<produtoApi[]>(this.API);
    }
    TransformarProdutos(dados: produtoApi[]):produto[] {
        return dados.map((p) => ({
            nome: p.title,
            preco: p.price,
        }));
    }
}
