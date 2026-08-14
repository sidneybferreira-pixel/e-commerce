import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Header } from './hared/layout/header/header';
import { AuthService } from './core/services/auth.service';

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

  authService = inject(AuthService);

  usuarioLogado = this.authService.usuarioLogado;
  login = this.authService.login.bind(this.authService);
  logout = this.authService.logout.bind(this.authService);
}