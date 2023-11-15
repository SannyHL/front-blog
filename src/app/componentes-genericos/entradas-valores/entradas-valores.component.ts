import { Component } from '@angular/core';
import { EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-entradas-valores',
  templateUrl: './entradas-valores.component.html',
  styleUrls: ['./entradas-valores.component.css']
})
export class  EntradasValoresComponent implements OnChanges, OnInit {
  @Input() titulo: string = '';
  @Input() placeholder?: string;
  @Input() tipo: string = 'input';
  @Input() type: string = 'text';
  @Input() maxlength: number = 100;
  descricao: string =''
  @Input() widthForm?: string;
  tamanhoDescricao: number = 0
  date?: Date
  dataMinima: Date = new Date
  form = new FormControl();
  @Input() valorDefault: any
  @Output() dadosDoFormulario = new EventEmitter<FormGroup>();
  @Output() dateChanged = new EventEmitter<Date>();

  constructor(){
    this.form.valueChanges.subscribe((value) => {
      this.dadosDoFormulario.emit(this.form.value);
    });
  }

  ngOnInit(): void {
    if(this.valorDefault){
      this.form = new FormControl(this.valorDefault)
      this.contadorLetras()
    } else {
      this.verificarTipo()
    }
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  contadorLetras(){
    this.tamanhoDescricao = this.form.value.length
  }

  verificarTipo(){
    if(this.type == 'time'){
      this.form = new FormControl('00:00');
    } else if(this.type == 'date'){
      this.form = new FormControl(new Date())
    }
  }

  onDateChange() {
    const selectedDate = this.form.value;
    this.dadosDoFormulario.emit(selectedDate);
  }

  onInput() {
    this.dadosDoFormulario.emit(this.form.value);
  }
}
