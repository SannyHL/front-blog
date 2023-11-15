import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AutenticacaoService } from './autenticacao.service';

@Injectable({
  providedIn: 'root'
})
export class GuardianService  implements CanActivate {

  constructor(
    private autenticacaoService: AutenticacaoService,
    private router: Router
  ) { }

  canActivate(): boolean {
    if (this.autenticacaoService.verificarToken()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
