export default class Board {
  private _width: number;
  private _height: number;

  constructor(width: number, height: number) {
    this._width = width;
    this._height = height;
  }

  get width(): number {
    return this._width;
  }

  set width(width: number) {
    this._width = width;
  }

  get height(): number {
    return this._height;
  }

  set height(height: number) {
    this._height = height;
  }

  public calcArea = (): number => this._height * 2 + this._width * 2;
}