import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import { usuarioLogado, login, logout } from './core/auth';
import { MatButtonModule } from '@angular/material/button';
import { Header } from './chared/layout/header/header';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, UpperCasePipe, MatButtonModule, Header, MatToolbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('e-commerce');
  nomeLoja = 'Mercado do Sidney';
  usuarioLogado = usuarioLogado;
  login = login;
  logout = logout;
}
