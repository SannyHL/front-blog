import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { GuardianService } from './services/guardian.service';
import { FeedComponent } from './feed/feed.component';
import { PostagemComponent } from './postagem/postagem.component';
import { CrudPostagemComponent } from './postagem/crud-postagem/crud-postagem.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent},
  { path: 'postagem', component: CrudPostagemComponent , canActivate: [GuardianService] },
  { path: 'feed', component: PostagemComponent , canActivate: [GuardianService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
