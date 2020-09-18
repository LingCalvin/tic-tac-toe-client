import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent {
  @Input() position: number;
  @Input() symbol: string;
  @Output() selected = new EventEmitter<number>();

  @HostListener('click')
  notify(): void {
    this.selected.emit(this.position);
  }

}
