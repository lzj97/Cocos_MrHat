const { ccclass, property } = cc._decorator;
import Conscroller from "../Controller";

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Node)
  Wall: cc.Node = null;

  wallOriginY: number = 0;
  touchOriginY: number = 0;

  onLoad() {
    const Controller = cc.find("Canvas/Controller");
    if (Controller) {
      const Script: Conscroller = Controller.getComponent("Controller");
      Script.ContinuousJump = false;
    }

    this.Wall.on(
      cc.Node.EventType.TOUCH_START,
      (e) => {
        this.touchOriginY = e.touch.getLocationY();
        this.wallOriginY = this.Wall.y;
      },
      this
    );
    this.Wall.on(
      cc.Node.EventType.TOUCH_MOVE,
      (e) => {
        this.Wall.y = e.touch.getLocationY() - this.touchOriginY + this.wallOriginY;
      },
      this
    );
  }
}
