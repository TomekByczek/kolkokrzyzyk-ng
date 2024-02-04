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
@Output() fieldClicked = new EventEmitter<boolean>();

isFieldEmpty():any {  //?

  if (this.xOrO === undefined) {
    this.fieldClicked.emit(true);
  }
  else {
    this.fieldClicked.emit(false);
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
