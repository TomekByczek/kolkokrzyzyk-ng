import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FieldComponent } from "./field/field.component";

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, FieldComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
  
})
export class GameComponent implements OnInit {
  public isgameactiv = false;
  public isBoardVisible = false; 
  public xOrO: boolean | undefined;  //x-false o-true
  public table: (boolean | undefined)[][] = [];
  public isNewGameButtonVisible = true;
  public gameStatusMesssage: string = '';
  public playing!: boolean; //x-false o-true

  ngOnInit(): void {
    
    this.isBoardVisible = false;
  }

  onFieldClicked(isFieldEmpty: boolean, row: number, col: number) {
    if (this.isgameactiv === true && isFieldEmpty === true) {
          this.table[row][col] = this.playing;
          this.playing = !this.playing;
        }
     if (this.playing === true){
          this.showMessage('Gra rozpoczęta! Gra O');
        }
      else {
      this.showMessage('Gra rozpoczęta! Gra X');
    }
    if (isFieldEmpty === false){
      this.showMessage('Znajdź puste pole');
    }
    
        
    
    var winner = this.isWinner();
    var freeFields = this.isFreeFields();
    console.log(freeFields);
    //?
    if (winner == true) {
      this.showMessage('Wygrało O');
      this.isgameactiv = false;
    }
    if (winner == false) {
      this.showMessage('Wygrał X');
      this.isgameactiv = false;
    }
    if (winner == null && freeFields == false) {

      this.showMessage('Remis, zagraj jeszcze raz');
      this.isgameactiv = false;
    }
  }

  startgame() {
    this.table = [];
    this.isgameactiv = true;
    this.isBoardVisible = true;
    this.playing = false; //x-false, o-true
    this.showMessage('Gra rozpoczęta! Gra X');
    this.isNewGameButtonVisible = false;
    this.table.push([undefined, undefined, undefined]);
    this.table.push([undefined, undefined, undefined]);
    this.table.push([undefined, undefined, undefined]);
  }

  endgame() {
    this.isgameactiv = false;
    this.isBoardVisible = false;
    this.isNewGameButtonVisible = true;
    this.showMessage('Gra zakonczona');
  }

  fieldcheck(row: number, col: number):boolean|undefined {
    if (row < 0|| row > 2) {
      throw 'Wartosc wiersza powinien zawierac sie miedzy 1 a 3';
    }
    if (col < 0 || col > 2) {
      throw 'Wartosc kolumny powinien zawierac sie miedzy 1 a 3';
    }
    else {
      var field = this.table[row][col];
      return field;
    }
  }




  isWinner() {
    if (this.table[0][0] == true && this.table[0][1] == true && this.table[0][2] == true)
      return true;
    if (this.table[1][0] == true && this.table[1][1] == true && this.table[1][2] == true)
      return true;
    if (this.table[2][0] == true && this.table[2][1] == true && this.table[2][2] == true)
      return true;
    if (this.table[0][0] == true && this.table[1][0] == true && this.table[2][0] == true)
      return true;
    if (this.table[0][1] == true && this.table[1][1] == true && this.table[2][1] == true)
      return true;
    if (this.table[0][2] == true && this.table[1][2] == true && this.table[2][2] == true)
      return true;
    if (this.table[0][0] == true && this.table[1][1] == true && this.table[2][2] == true)
      return true;
    if (this.table[0][2] == true && this.table[1][1] == true && this.table[2][0] == true)
      return true;
    if (this.table[0][0] == false && this.table[0][1] == false && this.table[0][2] == false)
      return false;
    if (this.table[1][0] == false && this.table[1][1] == false && this.table[1][2] == false)
      return false;
    if (this.table[2][0] == false && this.table[2][1] == false && this.table[2][2] == false)
      return false;
    if (this.table[0][0] == false && this.table[1][0] == false && this.table[2][0] == false)
      return false;
    if (this.table[0][1] == false && this.table[1][1] == false && this.table[2][1] == false)
      return false;
    if (this.table[0][2] == false && this.table[1][2] == false && this.table[2][2] == false)
      return false;
    if (this.table[0][0] == false && this.table[1][1] == false && this.table[2][2] == false)
      return false;
    if (this.table[0][2] == false && this.table[1][1] == false && this.table[2][0] == false)
      return false;
    else return null;
  }

  isFreeFields() {
    for (var row = 0; this.table.length > row; row++) {
      var index = this.table[row].indexOf(undefined);
      if (index >= 0) {
        return true;
      }
    }
    return false;
  }

  showMessage(message: string) {
    this.gameStatusMesssage = message;
  }

}