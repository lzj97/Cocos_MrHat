const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Node)
  target: cc.Node = null;

  @property(cc.Node)
  tieldMap: cc.Node = null;

  @property({
    visible: false,
  })
  rootCanvas: cc.Node = null;
  max_x: number = 0;
  mainWidth: number = 0;
  mapWidth: number = 0;
  mapLeft: number = 0;
  cameraLeft: number = 0;

  start() {
    this.rootCanvas = cc.find("Canvas");

    // console.log("mainWidth=",this.mainWidth);
    // console.log("mapWidth=", this.mapWidth);

    // console.log("this.max_x=", this.max_x);
    this.initData();
  }

  initData() {
    this.mainWidth = this.rootCanvas.width;
    this.mapWidth = this.tieldMap.width;
    this.max_x = this.mapWidth - this.mainWidth;

    const w_mapLeft = this.tieldMap.convertToWorldSpaceAR(cc.v2(-(this.mapWidth / 2), 0));
    this.mapLeft = this.rootCanvas.convertToNodeSpaceAR(w_mapLeft).x;
  }

  update(dt) {
    if (!this.target) return;

    var c_pos = this.convertToRootSpaceAR(this.target);
    // console.log(c_pos.x);

    // if (
    //   c_pos.x < this.mapLeft + this.mainWidth / 2 ||
    //   c_pos.x > this.mapLeft + this.mapWidth - this.mainWidth / 2
    // ) {
    //   return;
    // }

    this.mapLeft = this.convertToRootSpaceAR(this.tieldMap, cc.v2(-(this.mapWidth / 2), 0)).x;
    this.cameraLeft = this.convertToRootSpaceAR(this.node, cc.v2(-(this.mainWidth / 2), 0)).x;

    // if (c_pos.x <= 0 || c_pos.x >= this.max_x) {
    //   return;
    // }
    this.node.x = c_pos.x;
  }
  lateUpdate(dt: number): void {
    if (this.cameraLeft <= this.mapLeft) {
      // this.node.x = this.mapLeft + this.mainWidth / 2;
      return;
    }
  }

  convertToRootSpaceAR(node: cc.Node, nodePoint?: cc.Vec2): cc.Vec2 {
    // 将节点坐标系下的一个点转换到世界空间坐标系
    const w_pos = node.convertToWorldSpaceAR(nodePoint || cc.v2(0, 0));
    // 将一个世界坐标点转换到根节点坐标系
    return this.rootCanvas.convertToNodeSpaceAR(w_pos);
  }
}
