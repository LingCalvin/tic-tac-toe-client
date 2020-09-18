import { Player } from './player';
import { Board } from './board';

export class Game {
  players: Array<Player>;
  private round: number;
  board: Board;
  winner: Player;
  id: string;

  private symbolToPlayer(symbol: string): Player {
    return this.players.find(value => value.symbol === symbol);
  }

  checkRow(rowIndex: number): Player {
    const symbol = this.board.get(0, rowIndex);
    if (!symbol) {
      return undefined;
    }

    for (let i = 1; i < 3; ++i) {
      if (symbol !== this.board.get(i, rowIndex)) {
        return undefined;
      }
    }

    return this.symbolToPlayer(symbol);
  }

  checkColumn(columnIndex: number): Player {
    const symbol = this.board.get(columnIndex, 0);
    if (!symbol) {
      return undefined;
    }

    for (let i = 1; i < 3; ++i) {
      if (symbol !== this.board.get(columnIndex, i)) {
        return undefined;
      }
    }

    return this.symbolToPlayer(symbol);
  }

  checkDiagonal(): Player {
    const symbol = this.board.get(0, 0);
    if (!symbol) {
      return undefined;
    }

    if ([1, 2].some(i => this.board.get(i, i) !== symbol)) {
      return undefined;
    }

    return this.symbolToPlayer(symbol);
  }

  checkAntiDiagonal(): Player {
    const symbol = this.board.get(2, 0);
    if (!symbol) {
      return undefined;
    }

    if (
      [
        [1, 1],
        [0, 2],
      ].some(pair => this.board.get(pair[0], pair[1]) !== symbol)
    ) {
      return undefined;
    }

    return this.symbolToPlayer(symbol);
  }

  checkDiagonals(): Player {
    return this.checkDiagonal() || this.checkAntiDiagonal();
  }

  checkWin(x: number, y: number): Player {
    this.winner =
      this.checkColumn(x) || this.checkRow(y) || this.checkDiagonals();
    return this.winner;
  }

  checkDraw(): boolean {
    if (this.round === 9) {
      this.winner = null;
    }
    return this.winner === null;
  }
}
