import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { ComentarioModel } from '../models/comentario.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {
  private url = environment.backendUrl;

  constructor(
    private http: HttpClient,
  ) { }

  salvar(comentario: ComentarioModel): Observable<number>{
    return this.http.post<number>(this.url + `postagens/comentarios`, comentario)
  }

  buscarTodosComentariosAtivos(idPostagem: number): Observable<ComentarioModel[]>{
    return this.http.get<ComentarioModel[]>(this.url + `postagens/comentarios/ativos/${idPostagem}`)
  }

  buscarPorId(id: number): Observable<ComentarioModel>{
    return this.http.get<ComentarioModel>(this.url + `postagens/comentarios/${id}`)
  }


  deletar(id: number): Observable<number>{
    return this.http.delete<number>(this.url + `postagens/comentarios/${id}`)
  }


  atualizar(comentario: ComentarioModel): Observable<number>{
    return this.http.put<number>(this.url + `postagens/comentarios`, comentario)
  }

}
