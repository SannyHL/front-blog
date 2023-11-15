import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-botao',
  templateUrl: './botao.component.html',
  styleUrls: ['./botao.component.css']
})
export class BotaoComponent {
  @Input() texto: string = '';
  @Input() background: string = '';
  @Input() color: string = '';
  @Input() type: string = '';
  @Input() borderRadius?: string;
  @Input() iconeCentral?: string;
  @Input() width?: string;
  @Input() circular?: boolean;
  @Input() legenda: string = '';
  @Output() click = new EventEmitter<any>();

}
