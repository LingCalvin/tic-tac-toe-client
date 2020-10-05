import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-game-page',
  templateUrl: './new-game-page.component.html',
  styleUrls: ['./new-game-page.component.css'],
})
export class NewGamePageComponent implements OnInit {
  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigateByUrl('');
  }

  ngOnInit(): void {}
}
