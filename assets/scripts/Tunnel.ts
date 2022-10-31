// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import {MOVE_SPEED_PXPF} from "./Constant";
import {Global} from "./Global";

const {ccclass, property} = cc._decorator;
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    update(dt) {
        if (Global.game_ended) {
            return
        }
        this.node.x = this.node.x - MOVE_SPEED_PXPF;
        if (this.node.x < 0) {
            // todo remove and recycle
        }
    }
}
