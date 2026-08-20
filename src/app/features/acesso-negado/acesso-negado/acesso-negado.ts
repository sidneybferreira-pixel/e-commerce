import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthFacade } from '../../../core/facades/auth.facade';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-acesso-negado',
  imports: [RouterLink, MatButtonModule],
  templateUrl: './acesso-negado.html',
  styleUrl: './acesso-negado.css',
})
export class AcessoNegado {

  private router = inject(Router);
  private authfacade= inject(AuthFacade);

  sair(){
    this.authfacade.sair();
    this.router.navigateByUrl('/login');
    return;
  }
}
