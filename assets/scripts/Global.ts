import Game from "./Game";
import game = cc.game;

export class Global {
    static game: Game = null

    static game_ended = true


    static startGame() {
        console.log("start game")

        cc.director.getCollisionManager().enabled = true
        cc.director.getPhysicsManager().enabled = true

        // collision_manager.enabledDebugDraw = true
        // collision_manager.enabledDrawBoundingBox = true
        // cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
        //     // cc.PhysicsManager.DrawBits.e_pairBit |
        //     // cc.PhysicsManager.DrawBits.e_centerOfMassBit |
        //     cc.PhysicsManager.DrawBits.e_jointBit |
        //     cc.PhysicsManager.DrawBits.e_shapeBit
        // ;
        Global.game.buildNewGame()
        Global.game_ended = false

    }

    static endGame() {
        console.log("end game")
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, Global.onKeyDown, this);
        Global.game_ended = true
        Global.game.endGame()
        cc.director.getCollisionManager().enabled = false
        cc.director.getPhysicsManager().enabled = false

    }

    static onKeyDown(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.space:

                if (Global.game_ended) {
                    Global.restartGame()
                }
                break;
        }
    }

    static restartGame() {
        console.log("restart game")
        Global.game.buildNewGame()
        Global.game_ended = false
        cc.director.getCollisionManager().enabled = true
        cc.director.getPhysicsManager().enabled = true

    }
}