//型にDigitalPinを指定すると全てのピンが選択可能
//選択肢を絞るためSwitch文を使用

namespace THK {
    export enum SensorS {
        P1 = 1,
        P8 = 8,
        P13 = 13,
    }

    //% blockId=thk_kyouzai_setup
    //% block="教材LEDとセンサの初期設定"
    //% group="初期設定"
    //% weight=100 color=#ff8c00 icon="\uf085"
    export function thk_kyouzai_setup(): void {
                pins.setPull(DigitalPin.P1, PinPullMode.PullUp)
                pins.setPull(DigitalPin.P8, PinPullMode.PullUp)
                pins.setPull(DigitalPin.P13, PinPullMode.PullUp)
        let strip = neopixel.create(DigitalPin.P2, 10, NeoPixelMode.RGB)
        }

    
/**
//% blockId=thk_Pullup
//% block="センサ %SensorS|をプルアップ"
//% group="センサ"
    export function thk_sensor_PullUp(Sensor:SensorS): void {
        switch (Sensor) {
            case 1:
                pins.setPull(DigitalPin.P1, PinPullMode.PullUp)
            case 8:
                pins.setPull(DigitalPin.P8, PinPullMode.PullUp)
            case 13:
                pins.setPull(DigitalPin.P13, PinPullMode.PullUp)
        }
        
}
*/

    /**
   * 端子の状態をデジタルで返す。(0 or 1)
   
//% blockId=thk_analogread
//% block="センサ %SensorS|の状態""
//% group="センサ"
//% weight=100 color=#800000 icon="\uf085"
    export function getDigitalSensor(Sensor:SensorS): number {
        switch (Sensor) {
            case 1:
                return pins.digitalReadPin(DigitalPin.P1)
            case 3:
                return pins.digitalReadPin(DigitalPin.P3)
            case 8:
                return pins.digitalReadPin(DigitalPin.P8)
            case 13:
                return pins.digitalReadPin(DigitalPin.P13)
            default:
                return 0
            }
        }
      */


    /**
* 端子の状態をオンならtrueで返す。
*/
    //% blockId=is_thk_digitalread
    //% block="センサ %SensorS|がオン""
    //% group="センサ"
    //% weight=100 color=#008000 icon="\uf085"
    export function is_getDigitalSensor(Sensor: SensorS): boolean {
        switch (Sensor) {
            case 1:
            //現状では0のときオンの仕様なので
                if (pins.digitalReadPin(DigitalPin.P1) == 0) {
                    return true;
                } else {
                    return false;
                } 
            case 8:
                if (pins.digitalReadPin(DigitalPin.P8) == 0) {
            //現状では0のときオンの仕様なので
                    return true;
                } else {
                    return false;
                }
            case 13:
                if (pins.digitalReadPin(DigitalPin.P13) == 0) {
            //現状では0のときオンの仕様なので
                    return true;
                } else {
                    return false;
                }
            default:
                return false
        }
    }
   
}

