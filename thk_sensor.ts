
namespace THK {

 export enum SensorS {
        P1 = DigitalPin.P1,
        P8 = DigitalPin.P8,
        P13 = DigitalPin.P13,
    }

//% blockId=thk_Pullup
//% block="センサ %SensorS|をプルアップ"
//% group="センサ"
    export function P8_PullUp(Sensor: SensorS): void {
    
}

/**
   * P8
   * @param format number format, eg: OutputNumberFormat.INTEGER
   */
//% blockId=thk_analogread
//% block="センサ %SensorS|の状態""
//% group="センサ"
//% weight=100 color=#800000 icon="\uf085"
    export function getDistance2(Sensor: SensorS,format: OutputNumberFormat = OutputNumberFormat.INTEGER): number {
    return pins.digitalReadPin(DigitalPin.P8);
}
}
