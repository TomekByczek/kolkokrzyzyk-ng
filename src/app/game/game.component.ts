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
  public xOrO: boolean | undefined; //x-false o-true 
  public table: (boolean | undefined)[][] = [];
  public isNewGameButtonVisible = true;
  public gameStatusMesssage: string = '';

  ngOnInit(): void {
    // this.initFieldHandlers();
    this.isBoardVisible = false;
  }

  onFieldClicked(event: any) {
    var row = event.srcElement.dataset.row
    var col = event.srcElement.dataset.col
    var result = this.isFieldEmpty(row, col)
    if (this.isgameactiv == true) {
      if (result == true) {
        if (this.xOrO == false) {
          this.table[row][col] = false
          event.srcElement.innerHTML = 'X'
          this.xOrO = true
          this.showMessage('Gra rozpoczęta! Gra O')
        }
        else {
          this.table[row][col] = true
          event.srcElement.innerHTML = 'O'
          this.xOrO = false
          this.showMessage('Gra rozpoczęta! Gra X')
        }
      } else {
        this.showMessage('Znajdź puste pole')
      }
    }
    var winner = this.isWinner()
    var freeFields = this.isFreeFields()
    console.log(freeFields)
    //?
    if (winner == true) {
      this.showMessage('Wygrało O');
      this.isgameactiv = false
    }
    if (winner == false) {
      this.showMessage('Wygrał X');
      this.isgameactiv = false
    }
    if (winner == null && freeFields == false) {

      this.showMessage('Remis, zagraj jeszcze raz');
      this.isgameactiv = false
    }
  }

  startgame() {
    this.table = [];
    this.isgameactiv = true;
    this.isBoardVisible = true;
    this.xOrO = false;
    this.showMessage('Gra rozpoczęta! Gra X');
    this.isNewGameButtonVisible = false;
    this.table.push([undefined, undefined, undefined]);
    this.table.push([undefined, undefined, undefined]);
    this.table.push([undefined, undefined, undefined]);
    this.clinerFields();
    this.showMessage('Gra rozpoczęta')
  }

  endgame() {
    this.isgameactiv = false;
    this.isBoardVisible = false;
    this.isNewGameButtonVisible = true;
    this.showMessage('Gra zakonczona');
  }

  fieldcheck(row: number, col: number) {
    if (row < 1 || row > 3) {
      throw 'Wartosc wiersza powinien zawierac sie miedzy 1 a 3';
    }
    if (col < 1 || col > 3) {
      throw 'Wartosc kolumny powinien zawierac sie miedzy 1 a 3';
    }
    else {
      var field = this.table[row - 1][col - 1];
      return field;
    }
  }



  isFieldEmpty(row: number, col: number) {
    var field = this.table[row][col];
    if (field == undefined) {
      return true;
    }
    else {
      return false;
    }
  }
  // initFieldHandlers() {
  //   var gameFields = document.getElementsByTagName('td');
  //   for (var i = 0; gameFields.length > i; i++) {
  //     gameFields[i].addEventListener('click', this.onFieldClicked);
  //   }
  // }
  clinerFields() {
    var fields = document.getElementsByTagName('td');
    console.log(fields);
    //?
    for (var i = 0; fields.length > i; i++) {
      fields[i].innerHTML = '';
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
      var index = this.table[row].indexOf(undefined)
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