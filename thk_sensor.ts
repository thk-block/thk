
namespace THK {

 export enum SensorS {
        P8 = 8,
        P13 = 13,
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
