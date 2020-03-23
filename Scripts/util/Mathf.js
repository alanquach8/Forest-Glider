"use strict";
var util;
(function (util) {
    var Mathf = /** @class */ (function () {
        function Mathf() {
        }
        // angle = aiming angle in degrees
        // for x coordinate = bullet speed * cos(angle * util.Deg2Rad);
        // for y coordinate = bullet speed * sin(angle * util.Deg2Rad);
        Mathf.Clamp = function (value, min, max) {
            if (value < min) {
                value = min;
            }
            else if (value > max) {
                value = max;
            }
            return value;
        };
        Mathf.Clamp01 = function (value) {
            if (value < 0.0) {
                return 0.0;
            }
            if (value > 1.0) {
                return 1.0;
            }
            return value;
        };
        Mathf.Lerp = function (a, b, t) {
            return a + (b - a) * Mathf.Clamp01(t);
        };
        Mathf.LerpUnclamped = function (a, b, t) {
            return a + (b - a) * t;
        };
        Mathf.RandomRange = function (min, max) {
            return Math.random() * (max - min + 1) + min;
        };
        Mathf.Deg2Rad = 0.01745329;
        return Mathf;
    }());
    util.Mathf = Mathf;
})(util || (util = {}));
//# sourceMappingURL=Mathf.js.map