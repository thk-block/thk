
namespace THK {
//% blockId=P8_Pullup
//% block="P8をプルアップ"
//% group="センサ"
export function P8_PullUp(): void {
    THK.サーボモータ(THK.Servos.モータ1, 0)
    THK.サーボモータ(THK.Servos.モータ2, 0)
    THK.サーボモータ(THK.Servos.モータ3, 0)
}

/**
   * P8
   * @param format number format, eg: OutputNumberFormat.INTEGER
   */
//% blockId=P8
//% block="P8"
//% group="センサ"
//% weight=100
export function getDistance2(format: OutputNumberFormat = OutputNumberFormat.INTEGER): number {
    return pins.digitalReadPin(DigitalPin.P8);
}
}