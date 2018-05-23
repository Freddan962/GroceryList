export class FloatFormatter {

  static removeZeros(float: number): number {
    let floatStr = float.toPrecision(3);
    float = Number.parseFloat(floatStr);
    return float;
  }
  
}