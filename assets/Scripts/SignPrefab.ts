const { ccclass, property } = cc._decorator;

import Toast from "./utils/Toast";
import { pauseGame } from "./utils/common";
@ccclass
export default class NewClass extends cc.Component {
  protected onLoad(): void {
    this.node.on(cc.Node.EventType.TOUCH_END, this.startPlay, this);
  }

  start() {}

  startPlay() {
    const Text = this.node.getChildByName("Text");

    if (!Text.activeInHierarchy) {
      Toast("关卡尚未开启");
      return;
    }
    pauseGame(false);
    cc.director.loadScene("Level" + Text.getComponent(cc.Label)?.string);
  }
}
