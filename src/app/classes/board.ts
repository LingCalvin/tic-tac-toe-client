export class Board {
  board: Array<string>;

  private static translate(x: number, y: number): number {
    return x + 3 * y;
  }

  get(x: number, y: number): string {
    const index = Board.translate(x, y);
    return this.board[index];
  }

  isOccupied(x: number, y: number): boolean {
    const index = Board.translate(x, y);
    return this.board[index] !== null;
  }
}
