// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import RigidBody = cc.RigidBody;
import PhysicsBoxCollider = cc.PhysicsBoxCollider;
import {
    BIRD_INITIAL_X,
    GEN_TUNNEL_INTERVAL_MS,
    GEN_TUNNEL_POS_X,
    MAX_TUNNEL_HEIGHT,
    MIN_TUNNEL_HEIGHT,
    SPACE_HEIGHT,
    TOP_POS_Y
} from "./Constant";
import {Global} from "./Global";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Game extends cc.Component {

    @property(cc.Prefab)
    pref_tunnel: cc.Prefab = null

    @property(cc.Prefab)
    pref_bird: cc.Prefab = null

    @property(cc.Camera)
    main_camera: cc.Camera = null

    tunnel_pool: cc.NodePool = null

    last_gen_tunnel_time = 0

    tunnel_count = 0

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.check()
        Global.game = this
        Global.startGame()
        this.tunnel_pool = new cc.NodePool()
    }

    buildNewGame() {
        this.node.removeAllChildren(true)
        const bird = cc.instantiate(this.pref_bird)
        bird.parent = this.node
        bird.setPosition(BIRD_INITIAL_X, 400)
    }

    check() {
        if (this.pref_tunnel == null) {
            throw Error("Has not set pref_tunnel!")
        }
        if (this.main_camera == null) {
            throw Error("Has not set main_camera!")
        }
        if (this.pref_bird == null) {
            throw Error("Has not set pref_bird!")
        }
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
        if (now - this.last_gen_tunnel_time >= GEN_TUNNEL_INTERVAL_MS) {
            this.tunnel_count++
            this.generate_paired_tunnels_at(GEN_TUNNEL_POS_X)
            this.last_gen_tunnel_time = now
        }
    }

    /**
     * 获取一个 tunnel 节点
     */
    get_tunnel_node() {
        let new_tunnel
        if (this.tunnel_pool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
            new_tunnel = this.tunnel_pool.get();
            console.log("get tunnel from tunnel_pool : " + new_tunnel)
        } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            new_tunnel = cc.instantiate(this.pref_tunnel);
            console.log("instantiate tunnel : " + new_tunnel)
        }
        return new_tunnel
    }

    recycleTunnel(tunnel) {
        console.log("recycled tunnel : " + tunnel)
        this.tunnel_pool.put(tunnel)
    }


    /**
     * 在 x 处生成上下两个管道 。 x 为管道的中心点的横坐标。
     * @param x
     */
    generate_paired_tunnels_at(x: number) {
        const top_tunnel_height = MIN_TUNNEL_HEIGHT + Math.random() * (MAX_TUNNEL_HEIGHT - MIN_TUNNEL_HEIGHT)
        const bottom_tunnel_height = TOP_POS_Y - top_tunnel_height - SPACE_HEIGHT

        // top tunnel
        let top_tunnel = this.get_tunnel_node();
        top_tunnel.parent = this.node
        top_tunnel.height = top_tunnel_height
        let top_tunnel_collider = top_tunnel.getComponent(PhysicsBoxCollider)
        top_tunnel_collider.size = cc.size(top_tunnel.width, top_tunnel_height)
        top_tunnel_collider.apply()
        top_tunnel.setPosition(cc.v2(x, TOP_POS_Y - top_tunnel_height / 2))


        // bottom tunnel
        let bottom_tunnel = this.get_tunnel_node();
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
        const fail_label_node = new cc.Node()
        fail_label_node.addComponent(cc.Label)
        fail_label_node.getComponent(cc.Label).string = "游戏失败啦！\n按空格重新开始游戏！"
        fail_label_node.parent = this.main_camera.node
        fail_label_node.setPosition(this.main_camera.node.width / 2, this.main_camera.node.height / 2)
    }

}
