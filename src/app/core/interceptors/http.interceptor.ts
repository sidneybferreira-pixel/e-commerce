import { HttpInterceptorFn } from "@angular/common/http";
import { tap } from "rxjs" ;
import { catchError } from "rxjs";
import { throwError } from "rxjs";

export const HttpInterceptor: HttpInterceptorFn = (req, next) => {

    console.log('Inteceptando Requisitação: ', req.url);

    //! Aqui você pode adicionar Lógica para
    const token = 'fake-token-jwt';
    const novaReq = req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`,
        },
    });
return next (novaReq). pipe(
   tap({
      next: (event) => console.log('Responde: ', event),
      error: (error) => console.error('Erro de Requisitação: ', error)
    }),
    catchError((error) =>{
        console.error('ERRO GLOBAL:', error)
        if (error.status === 401){
            console.warn('Usuário não autorizado!');
        }
        if (error.status === 500){
            console.warn('Erro interno do servidor!');
        }
        return throwError(() => error);
    })
   );
};