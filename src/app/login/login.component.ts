import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UsuarioLoginModel } from '../models/usuario-login.model';
import { FormGroup } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { AutenticacaoService } from '../services/autenticacao.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnChanges {

  formulario!: FormGroup;
  usuarioLogin: UsuarioLoginModel = new UsuarioLoginModel()

  constructor(
    private loginService: LoginService,
    private autenticacaoService: AutenticacaoService,
    private router: Router
  ){}

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  receberEmail(email:any){
    this.usuarioLogin.email = email
  }

  receberSenha(senha:any){
    this.usuarioLogin.senha = senha
  }

  logar(){
    this.loginService.logar(this.usuarioLogin).subscribe({
      next: res =>{
        if(res){
          this.autenticacaoService.salvarToken(res.token);
          this.router.navigate(['']);
        } else{
          this.autenticacaoService.deletarToken();
        }
      }
    })
  }

  irParaTelaCadastro(){
    this.router.navigate(['cadastro']);
  }
}
