// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import RigidBody = cc.RigidBody;
import {Global} from "./Global";

const {ccclass, property} = cc._decorator;

const JUMP_COOL_DOWN_MS = 1000

const JUMP_IMPULSE = 1800

const GRAVITY_SCALE = 1.5

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    last_jump_time = 0

    // LIFE-CYCLE CALLBACKS:
    // 只在两个碰撞体开始接触时被调用一次
    onBeginContact(contact, selfCollider, otherCollider) {
        if (Global.game_ended) {
            return
        }
        console.log("on BeginContact")
        Global.endGame()
        this.removeKeyListeners()
    }

    // 只在两个碰撞体结束接触时被调用一次
    onEndContact(contact, selfCollider, otherCollider) {
        if (Global.game_ended) {
            return
        }
        console.log("on onEndContact")
    }

    // 每次将要处理碰撞体接触逻辑时被调用
    onPreSolve(contact, selfCollider, otherCollider) {
        if (Global.game_ended) {
            return
        }
        console.log("on onPreSolve")
    }

    // 每次处理完碰撞体接触逻辑时被调用
    onPostSolve(contact, selfCollider, otherCollider) {
        if (Global.game_ended) {
            return
        }
        console.log("on onPostSolve")
    }

    removeKeyListeners() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    onLoad() {
        this.node.getComponent(RigidBody).gravityScale = GRAVITY_SCALE
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    start() {

    }

    onKeyDown(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.space:
                const now = Date.now()
                if (now - this.last_jump_time > JUMP_COOL_DOWN_MS) {
                    const force = cc.v2(0, JUMP_IMPULSE)
                    const x = this.node.width / 2
                    let rigid_body = this.node.getComponent(RigidBody)
                    rigid_body.applyLinearImpulse(force, rigid_body.getWorldCenter(), true);
                    console.log('Press a key');
                }
                break;
        }
    }

    onKeyUp(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                console.log('release a key');
                break;
        }
    }

    // update (dt) {}
}
