import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent {
  @Input() squares: Array<string>;
  @Output() squareSelected = new EventEmitter<number>();

  notifySquareSelected(position: number): void {
    this.squareSelected.emit(position);
  }
}
