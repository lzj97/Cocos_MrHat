const { ccclass, property } = cc._decorator;
import GlobalStore from "../GlobalStore";

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Integer)
  rotateSpeed: number = 100;

  @property(cc.Boolean)
  clockwise: boolean = false;

  GlobalStore: GlobalStore = null;

  protected onLoad(): void {
    this.GlobalStore = cc.director
      .getScene()
      .getChildByName("GlobalStore")
      .getComponent("GlobalStore");
  }
  start() {}

  update(dt) {
    if (this.GlobalStore.paused) return;
    if (this.clockwise) {
      this.node.scaleX = 1;
    } else {
      this.node.scaleX = -1;
    }
    this.node.angle += (this.clockwise ? -1 : 1) * this.rotateSpeed * 10 * dt;
  }
}
