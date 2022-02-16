const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Node)
  target: cc.Node = null;

  @property(cc.Node)
  mapNode: cc.Node = null;

  rootCanvas: cc.Node = null;
  mainWidth: number = 0;
  mapWidth: number = 0;
  mapLeft: number = 0;
  moveTween: cc.Tween = null;

  start() {
    this.rootCanvas = cc.find("Canvas");
    this.initData();
  }

  initData() {
    this.mainWidth = this.rootCanvas.width;
    this.mapWidth = this.mapNode.width;

    this.mapLeft = this.convertToRootSpaceAR(this.mapNode, cc.v2(-(this.mapWidth / 2), 0)).x;
  }

  extendMap() {
    this.mapNode.width += 500;
    this.mapNode.x -= 250;
    this.initData();
  }

  update(dt) {
    if (!this.target) return;
    var c_pos = this.convertToRootSpaceAR(this.target);
    if (c_pos.x < this.mapLeft + this.mainWidth / 2) {
      this.node.x = this.mapLeft + this.mainWidth / 2;
      return;
    } else if (c_pos.x > this.mapLeft + this.mapWidth - this.mainWidth / 2) {
      this.node.x = this.mapLeft + this.mapWidth - this.mainWidth / 2;
      return;
    }
    this.node.x = c_pos.x;
  }
  convertToRootSpaceAR(node: cc.Node, nodePoint?: cc.Vec2): cc.Vec2 {
    // 将节点坐标系下的一个点转换到世界空间坐标系
    const w_pos = node.convertToWorldSpaceAR(nodePoint || cc.v2(0, 0));
    // 将一个世界坐标点转换到根节点坐标系
    return this.rootCanvas.convertToNodeSpaceAR(w_pos);
  }
}
