import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
selector : 'app-field',
standalone : true ,
imports : [CommonModule],
templateUrl : './field.component.html',

})

export class FieldComponent{
@Input() xOrO: boolean | undefined;
@Output() fieldClicked = new EventEmitter<void>();


 writeSymbol(): string {
  if (this.xOrO===false) {
    return 'X';
  }
  if (this.xOrO===true) {
    return 'O';
  }
  else {
    return '_';
  }
 }

}
