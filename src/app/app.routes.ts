import { Routes } from '@angular/router';
import { ListaProdutos } from './components/produtos/lista-produtos/lista-produtos';
import { Carrinho } from './features/carrinho/carrinho/carrinho';

export const routes: Routes = [
    {
        path:'',
        component: ListaProdutos,

    },
    {
        path:'carrinho',
        component: Carrinho,
    },
];
