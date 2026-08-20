import { HttpInterceptorFn } from '@angular/common/http';
import { tap, catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { AuthFacade} from '../facades/auth.facade';
import { Router } from '@angular/router';

export const HttpInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Interceptando requisição:', req.url);

  const authFacade = inject(AuthFacade);
  const router = inject(Router);
  const token = authFacade.obterToken();

  const novaReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    : req;

  return next(novaReq).pipe(
    tap({
      next: (event) => console.log('Resposta:', event),
      error: (error) => console.error('Erro de requisição:', error)
    }),

    catchError((error) => {
      console.error('ERRO GLOBAL:', error);

      if (error.status === 401) {
        console.error(
          'Erro de autenticação de usuário:',
          error
        );
        authFacade.sair();
        router.navigateByUrl('/login');
      }

      if (error.status === 500) {
        console.warn('Erro interno do servidor!');
      }
      if(error.status === 403){
        console.warn('acesso proibido, Usuário sem permissão!');
        router.navigateByUrl('/produtos');
      }

      return throwError(() => error);
    })
  );
};