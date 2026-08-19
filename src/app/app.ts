import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Header } from './hared/layout/header/header';
import { AuthFacade } from './core/facades/auth.facade';
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    UpperCasePipe,
    MatButtonModule,
    MatCardModule,
    Header
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('e-commerce');

  nomeLoja = 'Mercado do Sidney';

  authFacade = inject(AuthFacade);

  usuarioLogado = this.authFacade.usuarioLogado;
  login = this.authFacade.sair.bind(this.authFacade);
  logout = this.authFacade.sair.bind(this.authFacade);
}