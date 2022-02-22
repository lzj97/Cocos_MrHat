const { ccclass, property } = cc._decorator;
import Conscroller from "../Controller";

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Node)
  Wall: cc.Node = null;

  wallOriginY: number = 0;
  touchOriginY: number = 0;
  touchTargetY: number = 0;
  rigidbody: cc.RigidBody = null;

  onLoad() {
    const Controller = cc.find("Canvas/Controller");
    if (Controller) {
      const Script: Conscroller = Controller.getComponent("Controller");
      Script.ContinuousJump = false;
    }

    this.touchTargetY = this.Wall.y;
    this.rigidbody = this.Wall.getComponent(cc.RigidBody);
    this.Wall.on(
      cc.Node.EventType.TOUCH_START,
      (e) => {
        this.Wall.convertToNodeSpaceAR(e.touch.getLocation()).y;

        this.touchOriginY = e.touch.getLocationY();
        this.wallOriginY = this.Wall.y;
      },
      this
    );
    this.Wall.on(
      cc.Node.EventType.TOUCH_MOVE,
      (e) => {
        this.touchTargetY = this.Wall.convertToNodeSpaceAR(e.touch.getLocation()).y;
        // // this.Wall.y = e.touch.getLocationY() - this.touchOriginY + this.wallOriginY;

        // const v = this.rigidbody.linearVelocity;
        // // v.y = e.touch.getLocationY() - this.touchOriginY + this.wallOriginY;
        // v.y = 2 * (e.touch.getLocationY() - this.touchOriginY);

        // console.log(v.y);

        // this.rigidbody.linearVelocity = v;
      },
      this
    );
    this.Wall.on(
      cc.Node.EventType.TOUCH_END,
      (e) => {
        const v = this.rigidbody.linearVelocity;
        v.y = 0;
        this.rigidbody.linearVelocity = v;
      },
      this
    );
  }

  protected update(dt: number): void {
    // console.log(this.touchTargetY + this.touchOriginY == this.Wall.y);
    const v = this.rigidbody.linearVelocity;
    if (this.touchTargetY > this.Wall.y) {
      v.y = 2000 * 150 * dt;
    } else if (this.touchTargetY < this.Wall.y) {
      v.y = -2000 * 150 * dt;
    } else {
      v.y = 0;
    }
    this.rigidbody.linearVelocity = v;
  }
}
