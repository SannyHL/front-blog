import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PostagemModel } from 'src/app/models/postagem.model';
import { PostagemService } from 'src/app/services/postagem.service';

@Component({
  selector: 'app-crud-postagem',
  templateUrl: './crud-postagem.component.html',
  styleUrls: ['./crud-postagem.component.css']
})
export class CrudPostagemComponent implements OnInit {

  formulario!: FormGroup;
  @Input() postagem: PostagemModel = new PostagemModel()
  imagemForm: FormGroup;
  imaemSelecionada?: string;
  idUsuarioLogado?: any;

  constructor(
    private postagemService: PostagemService,
    private router: Router,
    private fb: FormBuilder
  ){
    this.imagemForm = this.fb.group({
      imagem: [''],
    });
  }


  ngOnInit(): void {
    this.idUsuarioLogado = localStorage.getItem("username")
  }

  receberTitulo(titulo:any){
    this.postagem.titulo = titulo
  }

  receberTexto(texto:any){
    this.postagem.texto = texto
  }

  buscarImagens() {
    document.getElementById('fileInput')?.click();
  }

  receberImagem(event: any) {
    const reader = new FileReader();
    this.imaemSelecionada = event
    if (event.target?.files && event.target?.files?.length) {
      const [file] = event.target.files;


      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imagemForm.patchValue({
          imagem: reader.result
        });
      };


    }

  }

  deletarImagem(){
    this.imagemForm.patchValue({
      imagem: null
    });
  }

  enviar(){
    if(!this.postagem.texto){
      alert("Gentileza preencher post.")
    } else{
      this.postagem.imagem = this.imagemForm.get('imagem')?.value;
      this.postagemService.salvar(this.postagem).subscribe({
        next: res =>{
          this.router.navigate(['feed']);
        }
      })
    }
  }

  voltarFeed(){
    this.router.navigate(['feed']);
  }

}
