/**
 * 「Kitronik I2C 16-Servo Driver Board」の教材用カスタムブロック
 *　回転方向反転、角度調整、パルス調整
 */
//% weight=150 color=#de3b09 icon="\uf085" block="THK教材"

namespace THK {

    //Some useful parameters. 
    let ChipAddress = 0x6A //default Kitronik Chip address
    let PrescaleReg = 0xFE //the prescale register address
    let Mode1Reg = 0x00  //The mode 1 register address

    // If you wanted to write some code that stepped through the servos then this is the BASe and size to do that 	
    let Servo1RegBase = 0x08
    let ServoRegDistance = 4
    //To get the PWM pulses to the correct size and zero offset these are the default numbers. 
    let ServoMultiplier = 226
    let ServoZeroOffset = 0x66
    let Pulse_bairitu = 85
    let initalised = false //a flag to allow us to initialise without explicitly calling the secret incantation
    

    //nice big list of servos for the block to use. These represent register offsets in the PCA9865
    export enum Servos {
        //% block="モータ１"
        Motor1= 0x08,
        //% block="モータ２"
        Motor2 = 0x0C,
        //% block="モータ３"
        Motor3 = 0x10,
        /**
        SV4 = 0x14,
        SV5 = 0x18,
        SV6 = 0x1C,
        SV7 = 0x20,
        SV8 = 0x24,
        SV9 = 0x28,
        SV10 = 0x2C,
        SV11 = 0x30,
        SV12 = 0x34,
        SV13 = 0x38,
        SV14 = 0x3C,
        SV15 = 0x40,
        SV16 = 0x44,
        */
    }

    export enum BoardAddresses {
        Board1 = 0x6A,

    }
    //Trim the servo pulses. These are here for advanced users, and not exposed to blocks.
    //It appears that servos I've tested are actually expecting 0.5 - 2.5mS pulses, 
    //not the widely reported 1-2mS 
    //that equates to multiplier of 226, and offset of 0x66
    // a better trim function that does the maths for the end user could be exposed, the basics are here 
    // for reference


        //% blockId=TrimServoMultiplier
    //% block="TrimServoMultiplierを%Value|に変更"
    //% group="サーボモータ"
    //% weight=100 color=#ff8c00 icon="\uf085"
    //% Value.min=113 Value.max=226

    export function TrimServoMultiplier(Value: number) {
        if (Value < 113) {
            ServoMultiplier = 113
        }
        else {
            if (Value > 226) {
                ServoMultiplier = 226
            }
            else {
                ServoMultiplier = Value
            }

        }
    }

        //% blockId=TrimServoZeroOffset
    //% block="TrimServoZeroOffsetを%Value|に変更"
    //% group="サーボモータ"
    //% weight=100 color=#ff8c00 icon="\uf085"
    //% Value.min=102 Value.max=204

    export function TrimServoZeroOffset(Value: number) {
        if (Value < 0x66) {
            ServoZeroOffset = 0x66
        }
        else {
            if (Value > 0xCC) {
                ServoZeroOffset = 0xCC
            }
            else {
                ServoZeroOffset = Value
            }

        }
    }
    //% blockId=Pulse
    //% block="パルス倍率を%Value|に変更"
    //% group="サーボモータ"
    //% weight=100 color=#ff8c00 icon="\uf085"
    //% Value.min=0 Value.max=100

    export function Pulse(Value: number) {
        Pulse_bairitu = Value
    }
    /*
        This secret incantation sets up the PCA9865 I2C driver chip to be running at 50Hx pulse repetition, and then sets the 16 output registers to 1.5mS - centre travel.
        It should not need to be called directly be a user - the first servo write will call it.
	
    */
    function secretIncantation(): void {
        let buf = pins.createBuffer(2)

        //Should probably do a soft reset of the I2C chip here when I figure out how

        // First set the prescaler to 50 hz
        buf[0] = PrescaleReg
        buf[1] = 0x85
        pins.i2cWriteBuffer(ChipAddress, buf, false)
        //Block write via the all leds register to set all of them to 90 degrees
        buf[0] = 0xFA
        buf[1] = 0x00
        pins.i2cWriteBuffer(ChipAddress, buf, false)
        buf[0] = 0xFB
        buf[1] = 0x00
        pins.i2cWriteBuffer(ChipAddress, buf, false)
        buf[0] = 0xFC
        buf[1] = 0x66
        pins.i2cWriteBuffer(ChipAddress, buf, false)
        buf[0] = 0xFD
        buf[1] = 0x00
        pins.i2cWriteBuffer(ChipAddress, buf, false)
        //Set the mode 1 register to come out of sleep
        buf[0] = Mode1Reg
        buf[1] = 0x01
        pins.i2cWriteBuffer(ChipAddress, buf, false)
        //set the initalised flag so we dont come in here again automatically
        initalised = true
    }

    /**
 * 全てのスロープ（モータ１～３）を水平（0度）にします。
 */
    //% blockId=level_all
    //% block="全てのスロープを水平（0度）にする"
    //% group="サーボモータ"
    //% weight=100 color=#ff8c00 icon="\uf085"

    export function LebelTheTable(): void {
        THK.thk_servo(THK.Servos.Motor1, 0)
        THK.thk_servo(THK.Servos.Motor2, 0)
        THK.thk_servo(THK.Servos.Motor3, 0)
    }

    //% blockId=Kitronik_servo
    //% block="%Servo|を %degrees|度にする"
    //% group="サーボモータ"
    //% weight=100 color=#ff8c00 icon="\uf085"
    //% degrees.min=-90 degrees.max=90
    /**
 * サーボモータの角度を指定します（-90°～+90°)
 * 筐体正面から見て時計周りが「+」、半時計周りが「-」
 * @param degrees describe parameter here, eg: 0
 */
    export function thk_servo(Servo: Servos, degrees: number): void {
        if (initalised == false) {
            secretIncantation()
        }

        degrees = degrees - 90 //-180～0度
        degrees = -degrees //反転（時計周りを＋にするため)

        if (degrees < 1) { //0°でモータが震えるため
            degrees = 1
        }

        let buf = pins.createBuffer(2)
        let HighByte = false
        let deg100 = degrees * Pulse_bairitu //元は100
        let PWMVal100 = deg100 * ServoMultiplier
        let PWMVal = PWMVal100 / 10000

        PWMVal = Math.floor(PWMVal)
        PWMVal = PWMVal + ServoZeroOffset
        if (PWMVal > 0xFF) {
            HighByte = true
        }
        buf[0] = Servo
        buf[1] = PWMVal
        pins.i2cWriteBuffer(ChipAddress, buf, false)
        if (HighByte) {
            buf[0] = Servo + 1
            buf[1] = 0x01
        }
        else {
            buf[0] = Servo + 1
            buf[1] = 0x00
        }
        pins.i2cWriteBuffer(ChipAddress, buf, false)
    }



    /**
     * Pause for the specified time in milliseconds
     * @param ms how long to pause for, eg: 100, 200, 500, 1000, 2000
     */    
    //% help=basic/pause weight=54
    //% async block="pause (ms) %pause" blockGap=16
    //% blockId=device_pause icon="\uf110"
    //% pause.shadow=timePicker
    //% group="基本"

    export function pause(ms: number): void {
        basic.pause(ms);
    }
    /**
  * Repeats the code forever in the background. On each iteration, allows other codes to run.
  * @param body code to execute
  */
    //% help=basic/forever weight=53 blockGap=16 blockAllowMultiple=1 afterOnStart=true
    //% blockId=device_forever block="forever" icon="\uf01e"
    //% group="基本"
    export function forever(a: () => void): void {
        basic.forever(a);
    }
}



