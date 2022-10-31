// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

const TOP_POS_Y = 600
const SPACE_HEIGHT = 200
const MIN_TUNNEL_HEIGHT = 100
const MAX_TUNNEL_HEIGHT = TOP_POS_Y - SPACE_HEIGHT - MIN_TUNNEL_HEIGHT
const WIDTH_CENTER_POINT = 200

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(cc.Prefab)
    pref_tunnel: cc.Prefab = null

    time = 0

    tunnel_count = 0

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.director.getCollisionManager().enabled = true
        cc.director.getPhysicsManager().enabled = true
    }

    start() {
        // for (let i = 0; i <= 10; i++) {
        //     this.generate_paired_tunnels_at(200 * i)
        // }
    }

    /**
     * 每秒钟生成一个管道
     * @param dt 自从上次 update 后经过的时间，单位为秒。
     * @protected
     */
    protected update(dt: number) {
        const last_second = Math.floor(this.time)
        this.time += dt
        const now_second = Math.floor(this.time)
        // todo : 使这里支持为 2 、3 等的状态
        if (now_second - last_second >= 1) {
            this.tunnel_count++
            this.generate_paired_tunnels_at(this.tunnel_count * WIDTH_CENTER_POINT)
        }
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
        top_tunnel.setPosition(cc.v2(x, TOP_POS_Y - top_tunnel_height / 2))


        // bottom tunnel
        let bottom_tunnel = cc.instantiate(this.pref_tunnel);
        bottom_tunnel.parent = this.node
        bottom_tunnel.height = bottom_tunnel_height
        bottom_tunnel.setPosition(cc.v2(x, bottom_tunnel_height / 2))

    }

    // update (dt) {}
}
