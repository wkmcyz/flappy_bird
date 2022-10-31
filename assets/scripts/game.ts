// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import RigidBody = cc.RigidBody;
import PhysicsBoxCollider = cc.PhysicsBoxCollider;
import {GEN_TUNNEL_INTERVAL, MAX_TUNNEL_HEIGHT, MIN_TUNNEL_HEIGHT, SPACE_HEIGHT, TOP_POS_Y} from "./Constant";
import {Global} from "./Global";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Game extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(cc.Prefab)
    pref_tunnel: cc.Prefab = null

    @property(cc.Prefab)
    pref_bird: cc.Prefab = null

    @property(cc.Prefab)
    fail: cc.Prefab = null

    last_gen_tunnel_time = 0

    tunnel_count = 0

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        Global.game = this
        let collision_manager = cc.director.getCollisionManager()
        collision_manager.enabled = true
        collision_manager.enabledDebugDraw = true
        collision_manager.enabledDrawBoundingBox = true
        cc.director.getPhysicsManager().enabled = true
        cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
            // cc.PhysicsManager.DrawBits.e_pairBit |
            // cc.PhysicsManager.DrawBits.e_centerOfMassBit |
            cc.PhysicsManager.DrawBits.e_jointBit |
            cc.PhysicsManager.DrawBits.e_shapeBit
        ;
        // this.generate_bird()
    }

    start() {
    }

    /**
     * 每秒钟生成一个管道
     * @param dt 自从上次 update 后经过的时间，单位为秒。
     * @protected
     */
    protected update(dt: number) {
        if (Global.game_ended) {
            return
        }
        const now = Date.now()
        if (now - this.last_gen_tunnel_time >= GEN_TUNNEL_INTERVAL) {
            this.tunnel_count++
            this.generate_paired_tunnels_at(900)
            this.last_gen_tunnel_time = now
        }
    }

    /**
     * gen bird
     */
    generate_bird() {
        if (this.pref_bird == null) {
            throw Error("Has not set pref_bird!")
        }
        const bird = cc.instantiate(this.pref_bird)
        bird.parent = this.node.parent
        bird.setPosition(20, TOP_POS_Y / 2)
    }

    /**
     * 在 x 处生成上下两个管道 。 x 为管道的中心点的横坐标。
     * @param x
     */
    generate_paired_tunnels_at(x: number) {
        if (this.pref_tunnel == null) {
            throw Error("Has not set pref_tunnel!")
        }
        const top_tunnel_height = MIN_TUNNEL_HEIGHT + Math.random() * (MAX_TUNNEL_HEIGHT - MIN_TUNNEL_HEIGHT)
        const bottom_tunnel_height = TOP_POS_Y - top_tunnel_height - SPACE_HEIGHT

        // top tunnel
        let top_tunnel = cc.instantiate(this.pref_tunnel);
        top_tunnel.parent = this.node
        top_tunnel.height = top_tunnel_height
        let top_tunnel_collider = top_tunnel.getComponent(PhysicsBoxCollider)
        top_tunnel_collider.size = cc.size(top_tunnel.width, top_tunnel_height)
        top_tunnel_collider.apply()
        top_tunnel.setPosition(cc.v2(x, TOP_POS_Y - top_tunnel_height / 2))


        // bottom tunnel
        let bottom_tunnel = cc.instantiate(this.pref_tunnel);
        bottom_tunnel.parent = this.node
        bottom_tunnel.height = bottom_tunnel_height
        let bottom_tunnel_collider = bottom_tunnel.getComponent(PhysicsBoxCollider)
        bottom_tunnel_collider.size = cc.size(bottom_tunnel.width, bottom_tunnel_height)
        bottom_tunnel_collider.apply()
        bottom_tunnel.setPosition(cc.v2(x, bottom_tunnel_height / 2))

    }

    endGame() {
        console.log("游戏结束！")
        this.add_fail_label()
    }

    add_fail_label() {
        const fail_label = new cc.Label()
        fail_label.string = "游戏失败啦！"
        fail_label.node.parent = this.node
    }

}
