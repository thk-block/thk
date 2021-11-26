let thk_strip = neopixel.create(DigitalPin.P2, 10, NeoPixelMode.RGB)

namespace THK {
  
    //% blockId=thk_NeoPixel_OFF2
    //% block="LEDを消灯する"
    //% group="LED"
    //% weight=105 color=#2699BF icon="\uf085"
    export function thk_NeoPixel_OFF(): void {

                thk_strip.showColor(neopixel.colors(NeoPixelColors.Black))
                 }

    //% blockId=thk_NeoPixel_Rainbow
    //% block="LEDを虹色に点灯する"
    //% group="LED"
    //% weight=102 color=#2699BF icon="\uf085"
    export function thk_NeoPixel_Rainbow(): void {
        thk_strip.showRainbow(1, 360)
    }

    //% blockId=thk_NeoPixel_Light
    //% block="LEDを %Color|色に点灯する"
    //% group="LED"
    //% weight=100 color=#2699BF icon="\uf085"
    export function thk_NeoPixel_Light(Color: NeoPixelColors): void {
        
        thk_strip.showColor(neopixel.colors(Color))
    }
    
     /**
    //% blockId=thk_NeoPixel_Setting
    //% block="LEDの初期設定(変数：thk_strip,P2,LED10個,RGBモード)"
    //% group="LED"
    //% weight=100 color=#2699BF icon="\uf085"
    
    export function thk_NeoPixel_Setting(): void {
        let thk_strip = neopixel.create(DigitalPin.P2, 10, NeoPixelMode.RGB)

    }
*/

}