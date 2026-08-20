import { Injectable, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthFacade {

  private authService = inject(AuthService);

  usuarioAtual = this.authService.usuarioAtual;
  usuarioLogado = this.authService.usuarioLogado;
  admin = this.authService.admin;
  token = this.authService.token;

  realizarLogin(email: string, senha: string): boolean {
    return this.authService.login(email, senha);
  }

  sair(): void {
    this.authService.admin();
  }

  obterToken() {
    return this.authService.obterToken();
  }

  obterPerfil() {
    return this.authService.obterPerfil();
  }
}