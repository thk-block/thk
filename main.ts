THK.thk_kyouzai_setup()
basic.forever(function () {
    if (THK.is_getDigitalSensor(THK.SensorS.P1)) {
        THK.thk_servo(THK.Servos.Motor1, 0)
        THK.thk_NeoPixel_Light(NeoPixelColors.Red)
    }
})
basic.forever(function () {
    if (THK.is_getDigitalSensor(THK.SensorS.P13)) {
        THK.thk_servo(THK.Servos.Motor1, 46)
    }
})
