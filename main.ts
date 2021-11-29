basic.forever(function () {
    THK.thk_servo(THK.Servos.Motor2, 0)
    THK.thk_NeoPixel_Light(THK.thk_led_effect.Rainbow)
})
