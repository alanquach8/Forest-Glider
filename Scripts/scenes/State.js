"use strict";
var scenes;
(function (scenes) {
    var State;
    (function (State) {
        State[State["NO_SCENE"] = -1] = "NO_SCENE";
        State[State["START"] = 0] = "START";
        State[State["INSTRUCTIONS1"] = 1] = "INSTRUCTIONS1";
        State[State["INSTRUCTIONS2"] = 2] = "INSTRUCTIONS2";
        State[State["CHARACTER_SELECT"] = 3] = "CHARACTER_SELECT";
        State[State["PLAY"] = 4] = "PLAY";
        State[State["END"] = 5] = "END";
        State[State["WIN"] = 6] = "WIN";
        State[State["LOSE"] = 7] = "LOSE";
        State[State["NUM_OF_SCENES"] = 8] = "NUM_OF_SCENES";
    })(State = scenes.State || (scenes.State = {}));
})(scenes || (scenes = {}));
//# sourceMappingURL=State.js.map