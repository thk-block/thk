let thk_strip = neopixel.create(DigitalPin.P2, 6, NeoPixelMode.RGB)

namespace THK {

    export enum thk_led_effect {
        //% block="虹"
        Rainbow = 1,
        //% block="赤"
        Red = 0xFF0000,
        //% block="オレンジ"
        Orange = 0xFFA500,
        //% block="黄"
        Yellow = 0xFFFF00,
        //% block="緑"
        Green = 0x00FF00,
        //% block="青"
        Blue = 0x0000FF,
        //% block="インディゴ"
        Indigo = 0x4b0082,
        //% block="すみれ"
        Violet = 0x8a2be2,
        //% block="紫"
        Purple = 0xFF00FF,
        //% block="白"
        White = 0xFFFFFF,
        //% block="黒（消灯）"
        Black = 0x000000
    }

        
    //% blockId=thk_NeoPixel_OFF2
    //% block="LEDを消灯する"
    //% group="LED"
    //% weight=95 color=#2699BF icon="\uf085"
    export function thk_NeoPixel_OFF(): void {
  
                thk_strip.showColor(neopixel.colors(NeoPixelColors.Black))
    }
    

    //% blockId=thk_NeoPixel_Light
    //% block="LEDを %Color|色に点灯する"
    //% group="LED"
    //% weight=110 color=#2699BF icon="\uf085"
    export function thk_NeoPixel_Light(Color: thk_led_effect): void {
        if (Color == 1) {
            thk_strip.showRainbow(1, 360)
        }else{
            thk_strip.showColor(Color)
        }
      
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