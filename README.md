
# 管道对的随机生成
- 管道每帧自动向左移动
- 每隔一定时间在屏幕右边自动生成管道对象
- 

# 基本的小鸟的动作。向右飞以及点击上升
- 小鸟是一个刚体碰撞体，X 坐标不动。（整体场景左移）
- 小鸟监听事件，收到事件以后给小鸟施加一个向上的冲量。

# 小鸟和管道的碰撞逻辑
- "刚体碰撞组件监听碰撞事件"和"碰撞组件监听碰撞事件" 是两套 API。
  - 前者是 "onBeginContact / ...." ,后者是 "onCollisionEnter"
- 

# 场景滑动以及上边边缘判定
- 动态创建节点（不是 prefab），需要
  1. 创建 node `let n=new cc.Node()` 
  2. 给 node 添加对应的组件功能 `n.addComponent(cc.Label)`
  3. 设置 node 的组件属性 `n.getComponent(cc.Label).string ="xxx"`
  4. 设置 node 的父节点 `n.node.parent = xxx`


# 游戏结束逻辑
- 目前是在所有的动的函数里，都添加了状态判断。但这样很不优雅。

# UI 系统

# 分数系统