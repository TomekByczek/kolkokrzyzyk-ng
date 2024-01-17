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

isFieldEmpty(row: number, col: number):any {
  var field = undefined;
  if (field == undefined) {
   this.fieldClicked.emit();
  }
  else {
    return false;
  }
}

 writeSymbol(): string {
  if (this.xOrO===false) {
    return 'X';
  }
  if (this.xOrO===true) {
    return 'O';
  }
  else {
    return '__';
  }
 }

}
