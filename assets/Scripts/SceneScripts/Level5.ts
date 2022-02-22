const { ccclass, property } = cc._decorator;
import Conscroller from "../Controller";

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Node)
  Player: cc.Node = null;

  @property(cc.Node)
  Key: cc.Node = null;

  playerOriginY: number = 0;
  fixedKey: boolean = false;

  onLoad() {
    this.playerOriginY = this.Player.y;
    this.Key.on(cc.Node.EventType.TOUCH_START, () => (this.fixedKey = true), this);
    this.Key.on(cc.Node.EventType.TOUCH_END, () => (this.fixedKey = false), this);
    this.Key.on(cc.Node.EventType.TOUCH_CANCEL, () => (this.fixedKey = false), this);

    this.Key.on(cc.Node.EventType.MOUSE_DOWN, () => (this.fixedKey = true), this);
    this.Key.on(cc.Node.EventType.MOUSE_UP, () => (this.fixedKey = false), this);

    const Controller = cc.find("Canvas/Controller");
    if (Controller) {
      const Script: Conscroller = Controller.getComponent("Controller");
      Script.ContinuousJump = false;
    }
  }

  start() {}

  update(dt) {
    if (!this.fixedKey && this.Player.y - this.playerOriginY > 0) {
      this.Key.y += this.Player.y - this.playerOriginY;
      this.playerOriginY = this.Player.y;
    }
  }
}
