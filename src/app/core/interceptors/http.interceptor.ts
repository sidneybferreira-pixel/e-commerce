import { HttpInterceptorFn } from '@angular/common/http';
import { tap, catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const HttpInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Interceptando requisição:', req.url);

  const authService = inject(AuthService);
  const token = authService.obterToken();

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
        console.warn(
          'Erro de autenticação de usuário:',
          error
        );
      }

      if (error.status === 500) {
        console.warn('Erro interno do servidor!');
      }

      return throwError(() => error);
    })
  );
};