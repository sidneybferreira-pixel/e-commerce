import { Component, signal } from '@angular/core';
import { LiataProdutos } from './components/liata-produtos/liata-produtos';
import { from } from 'rxjs';
//import { RouterOutlet } from '@angular/router'; remove a importação do RouterOutle
//import {Produto} from './components/produto/produto';// importando a classe
import(LiataProdutos) from './components/liata-produtos/liata-produto';
@Component({
  selector: 'app-root',
  imports: [LiataProdutos],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('e-commerce');
}
