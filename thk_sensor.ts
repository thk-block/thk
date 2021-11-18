//型にDigitalPinを指定すると全てのピンが選択可能
//選択肢を絞るためSwitch文を使用

namespace THK {
    export enum SensorS {
        P1 = 1,
        P3 = 3,
        P8 = 8,
        P13 = 13,
    }

//% blockId=thk_Pullup
//% block="センサ %SensorS|をプルアップ"
//% group="センサ"
    export function thk_sensor_PullUp(Sensor:SensorS): void {
        switch (Sensor) {
            case 1:
                pins.setPull(DigitalPin.P1, PinPullMode.PullUp)
            case 3:
                pins.setPull(DigitalPin.P3, PinPullMode.PullUp)
            case 8:
                pins.setPull(DigitalPin.P8, PinPullMode.PullUp)
            case 13:
                pins.setPull(DigitalPin.P13, PinPullMode.PullUp)
        }
        
}

    /**
   * 端子の状態をデジタルで返す。(0 or 1)
   */
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
        
}

