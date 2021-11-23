
let strip = neopixel.create(DigitalPin.P2, 10, NeoPixelMode.RGB)

namespace THK {

    //% blockId=thk_NeoPixel_OFF
    //% block="LEDを消灯する"
    //% group="LED"
    //% weight=100 color=#2699BF icon="\uf085"
    export function thk_NeoPixel_OFF(): void {
        strip.showColor(neopixel.colors(NeoPixelColors.Black))
    }

    //% blockId=thk_NeoPixel_Light
    //% block="LEDを %Color|色に点灯する"
    //% group="LED"
    //% weight=100 color=#2699BF icon="\uf085"
    export function thk_NeoPixel_Light(Color: NeoPixelColors): void {
        strip.showColor(neopixel.colors(Color))
    }
    
     /**
    //% blockId=thk_NeoPixel_Setting
    //% block="LEDの初期設定(変数：strip,P2,LED10個,RGBモード)"
    //% group="LED"
    //% weight=100 color=#2699BF icon="\uf085"
    
    export function thk_NeoPixel_Setting(): void {
        let strip = neopixel.create(DigitalPin.P2, 10, NeoPixelMode.RGB)

    }
*/

}