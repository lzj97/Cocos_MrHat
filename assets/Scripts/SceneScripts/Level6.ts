const { ccclass, property } = cc._decorator;
import GlobalStore from "../GlobalStore";
import Conscroller from "../Controller";

@ccclass
export default class NewClass extends cc.Component {
  GlobalStore: GlobalStore = null;
  ControllerMask: cc.Node = null;

  protected onLoad(): void {
    const Controller = cc.find("Canvas/Controller");
    if (Controller) {
      const Script: Conscroller = Controller.getComponent("Controller");
      Script.ContinuousJump = false;
    }

    this.GlobalStore = cc.director
      .getScene()
      .getChildByName("GlobalStore")
      .getComponent("GlobalStore");

    this.ControllerMask = cc.find("Canvas/Controller/PauseDialog/Background");

    this.ControllerMask.y = this.ControllerMask.height / 2;

    //   拷贝一个遮罩放在屏幕下半部分区域，开启点击穿透
    const mask = cc.instantiate(this.ControllerMask);
    mask.getComponent(cc.BlockInputEvents).enabled = false;
    mask.parent = this.ControllerMask.parent;
    mask.y = -this.ControllerMask.height / 2;
  }
  start() {}
}
