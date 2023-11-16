export class PostagemModel{
  id?: number
  titulo?: string
  texto!: string
  imagem?:string
  usuarioId?:number
  dataCriacao?: Date
  dataAlteracao?:Date
  ativo?:boolean


}
