import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url = environment.backendUrl;

  constructor(
    private http: HttpClient,
  ) { }

  salvar(usuario: UsuarioModel): Observable<number>{
    return this.http.post<number>(this.url + `usuarios`, usuario)
  }
}
