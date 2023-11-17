import { Injectable } from '@angular/core';
import { CHAVE } from '../utils/util';


@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  constructor() { }

  salvarToken(token:string){
    return localStorage.setItem(CHAVE, token)
  }

  retornarToken(){
    return localStorage.getItem(CHAVE) ?? ""
  }

  verificarToken(){
    return !!this.retornarToken();
  }

  deletarToken(){
    return localStorage.removeItem(CHAVE)
  }
}
