const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  touchOrigin: cc.Vec2 = null;
  nodeOrigin: cc.Vec2 = null;
  onLoad() {
    this.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
    this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
  }

  onCollisionEnter(other, self) {
    if (other.node.name === "Door") {
      other.node.destroy();
      self.node.destroy();
    }
  }
  touchStart(event) {
    this.touchOrigin = event.touch.getLocation();
    this.nodeOrigin = this.node.getPosition();
  }
  touchMove(event) {
    const touchPosition = new cc.Vec2(
      event.touch.getLocationX() - this.touchOrigin.x,
      event.touch.getLocationY() - this.touchOrigin.y
    );

    this.node.setPosition(
      new cc.Vec2(this.nodeOrigin.x + touchPosition.x, this.nodeOrigin.y + touchPosition.y)
    );
  }
}
