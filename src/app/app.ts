import { Component, signal } from '@angular/core';
import { ListaProdutos } from './components/produtos/lista-produtos/lista-produtos';
import { from } from 'rxjs';
//import { RouterOutlet } from '@angular/router'; remove a importação do RouterOutle
//import {Produto} from './components/produto/produto';// importando a classe
@Component({
  selector: 'app-root',
  imports: [ListaProdutos],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('e-commerce');
}
