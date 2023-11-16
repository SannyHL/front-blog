import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostagemModel } from '../models/postagem.model';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  private url = environment.backendUrl;

  constructor(
    private http: HttpClient,
  ) { }

  salvar(postagem: PostagemModel): Observable<number>{
    return this.http.post<number>(this.url + `postagens`, postagem)
  }

  buscarTodasAtivas(): Observable<PostagemModel[]>{
    return this.http.get<PostagemModel[]>(this.url + `postagens`)
  }

  buscarPorId(idPostagem: number): Observable<PostagemModel>{
    return this.http.get<PostagemModel>(this.url + `postagens/${idPostagem}`)
  }


  deletar(idPostagem: number): Observable<number>{
    return this.http.delete<number>(this.url + `postagens/${idPostagem}`)
  }


  atualizar(postagem: PostagemModel): Observable<number>{
    return this.http.put<number>(this.url + `postagens`, postagem)
  }
}
