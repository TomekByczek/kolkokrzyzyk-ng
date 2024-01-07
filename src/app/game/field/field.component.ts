import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
selector : 'app-field',
standalone : true ,
imports : [CommonModule],
templateUrl : './field.component.html',

})

export class FieldComponent{

  public xOrO: boolean | undefined = undefined //false-play X, true-play O
  public token: string = '___'
  
 madeToken() {
  this.token = 'X'
 }

}