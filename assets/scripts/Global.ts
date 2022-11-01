import Game from "./Game";
import game = cc.game;

export class Global {
    static game: Game = null

    static game_ended = false

    static endGame() {
        Global.game_ended = true
        Global.game.endGame()
    }
}