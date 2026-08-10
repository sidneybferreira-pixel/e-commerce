import { Component,inject } from '@angular/core';
import{ReactiveFormsModule, FormGroup, FormControl} from '@angular/forms';
import { CarrinhoService } from '../../../core/services/carrinho.service';


@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  carrinhoService = inject(CarrinhoService);

  formulario = new FormGroup({
    nome: new FormGroup(''),
    email:new FormGroup(''),
    endereco:new FormGroup(''),
  });

  finalizar(){
    console.log('Dados do Formulario: ', this.formulario.value);
     console.log('Itens no carrinho: ', this.carrinhoService.itens);
  }
}