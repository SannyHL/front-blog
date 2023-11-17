import { Component, OnInit } from '@angular/core';
import { PostagemService } from '../services/postagem.service';
import { PostagemModel } from '../models/postagem.model';
import { HttpResponse } from '@angular/common/http';
import { ComentarioModel } from '../models/comentario.model';
import { ComentariosService } from '../services/comentarios.service';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-postagem',
  templateUrl: './postagem.component.html',
  styleUrls: ['./postagem.component.css']
})
export class PostagemComponent implements OnInit {

  postagens: PostagemModel[] = []
  postSecionado:PostagemModel = new PostagemModel()
  comentarios: ComentarioModel[] = []
  comentario: ComentarioModel= new ComentarioModel()
  idUsuarioLogado: any

  constructor(
    private postagemService: PostagemService,
    private comentariosService: ComentariosService,
    private loginService: LoginService,
    private router: Router,
  ){}

  ngOnInit(): void {
    this.buscarTodasPostagensAtivas()
    this.idUsuarioLogado = this.loginService.decodificarToken().id
  }

  buscarTodasPostagensAtivas(){
    this.postagens = []
    this.postSecionado = new PostagemModel()
    this.postagemService.buscarTodasAtivas().subscribe({
      next: res=> {
        this.postagens = res
        this.postagens.forEach(postagem => {
          if(postagem.imagem){
            this.postagemService.obterImagem(postagem.imagem).subscribe((response: HttpResponse<Blob>) => {
              const blob = new Blob([response.body!], { type: response.headers.get('Content-Type')! });
              const objectURL = URL.createObjectURL(blob);
              postagem.imagem = objectURL;
            }, );
          }
        })
      }
    })
  }

  receberComentario(comentario: any){
    this.comentario.texto = comentario
  }

  abrirPost(postagem : PostagemModel){
    this.postSecionado = postagem
    this.buscarTodosComentariosAtivos()
  }

  comentar(){
    if(!this.comentario.texto){
      alert("Gentileza preencher texto");
    } else{
      this.comentario.postagemId = this.postSecionado.id
      this.comentario.usuarioId = this.postSecionado.id
      this.comentariosService.salvar(this.comentario).subscribe({
        next: res =>{
          this.buscarTodosComentariosAtivos()
        }
      })
    }

  }

  buscarTodosComentariosAtivos(){
    if(this.postSecionado.id){
      this.comentariosService.buscarTodosComentariosAtivos(this.postSecionado.id).subscribe({
        next: res =>{
          this.comentarios = res
        }
      })
    }

  }

  deletarPost(){
    if(this.postSecionado.id){
      this.postagemService.deletar(this.postSecionado.id).subscribe({
        next: res =>{
          this.postSecionado = new PostagemModel();
          this.buscarTodasPostagensAtivas()
        }
      })
    }

  }

  abrirNovoPost(){
    this.router.navigate(['postagem']);
  }


}
