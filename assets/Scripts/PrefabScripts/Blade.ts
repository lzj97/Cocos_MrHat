const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Integer)
  rotateSpeed: number = 100;

  @property(cc.Boolean)
  clockwise: boolean = false;

  start() {}

  update(dt) {
    if (this.clockwise) {
      this.node.scaleX = 1;
    } else {
      this.node.scaleX = -1;
    }
    this.node.angle += (this.clockwise ? -1 : 1) * this.rotateSpeed * 10 * dt;
  }
}
