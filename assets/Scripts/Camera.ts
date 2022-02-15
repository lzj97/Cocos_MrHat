const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Sprite)
  target: cc.Sprite = null;

  @property(cc.Node)
  tieldMap: cc.Node = null;

  @property({
    visible: false,
  })
  max_x: number = 0;

  start() {
    var mainWidth = cc.find("Canvas").width;
    var mapWidth = this.tieldMap.width;
    this.max_x = mapWidth - mainWidth;

    console.log("mainWidth=", mainWidth);
    console.log("mapWidth=", mapWidth);

    console.log("this.max_x=", this.max_x);
  }

  update(dt) {
    if (!this.target) return;
    // 将节点坐标系下的一个点转换到世界空间坐标系
    var w_pos = this.target.node.convertToWorldSpaceAR(cc.v2(0, 0));
    // 将一个点转换到节点 (局部) 空间坐标系
    var c_pos = this.node.parent.convertToNodeSpaceAR(w_pos);
    if (c_pos.x <= 0 || c_pos.x >= this.max_x) {
      return;
    }
    this.node.x = c_pos.x;
  }
}
