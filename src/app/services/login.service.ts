import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { UsuarioLoginModel } from '../models/usuario-login.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { AutenticacaoService } from './autenticacao.service';
import { UsuarioModel } from '../models/usuario.model';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = environment.backendUrl;

  private usuario = new BehaviorSubject<UsuarioModel | null> (null)

  constructor(
    private http: HttpClient,
    private autenticacaoService: AutenticacaoService
  ) {
    if(this.autenticacaoService.verificarToken()){
      this.decodificarToken()
    }
  }

  logar(usuario: UsuarioLoginModel): Observable<any>{
    return this.http.post<any>(this.url + `login`, usuario)
  }

  decodificarToken(){
    const token = this.autenticacaoService.retornarToken();
    const usuario = jwtDecode(token) as UsuarioModel
    this.usuario.next(usuario)
  }

  retornarUser(){
    return this.usuario.asObservable();
  }

  salvarToken(token: string){
    this.autenticacaoService.salvarToken(token)
    if(token){
      this.decodificarToken();
    }
  }

  deletarToken(){
    this.autenticacaoService.deletarToken()
    this.usuario.next(null)
  }

  verificarToken(){
    return this.autenticacaoService.verificarToken()
  }
}
