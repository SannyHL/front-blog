import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from '../models/usuario.model';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  formulario!: FormGroup;
  usuario: UsuarioModel = new UsuarioModel()
  menssagemErro: boolean = false

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
  ){}

  ngOnInit(): void {

    this.usuario = new UsuarioModel()
  }

  receberNome(nome:any){
    this.usuario.nome = nome
  }

  receberEmail(email:any){
    this.usuario.email = email
  }

  receberSenha(senha:any){
    this.usuario.senha = senha
  }

  salvar(){
    this.menssagemErro = false
    if(this.usuario.email && this.usuario.nome && this.usuario.senha){
      this.usuarioService.salvar(this.usuario).subscribe({
        next: res =>{
          console.log(res)
        }, complete: ()=> this.router.navigate(['login'])
      })
    } else {
      this.menssagemErro = true
    }

  }
}
