import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { GameService } from './game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Tic-Tac-Toe';
  private ngUnsubscribe = new Subject<void>();

  constructor(
    public gameService: GameService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getConnectionStatus();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getConnectionStatus(): void {
    this.gameService
      .getConnectionStatusObservable()
      .pipe(distinctUntilChanged(), takeUntil(this.ngUnsubscribe))
      .subscribe((status) => {
        if (status === 'disconnected') {
          this.router.navigateByUrl('/');
          this.snackBar.open('Attempting to connect to server...');
        } else {
          this.snackBar.dismiss();
        }
      });
  }
}
