const { ccclass, property } = cc._decorator;
import { loadNextScene, reloadScene } from "./utils/common";

@ccclass
export default class NewClass extends cc.Component {
  onLoad() {}
  start() {}

  // update (dt) {}

  onBeginContact(contact, selfCollider, otherCollider) {
    if (otherCollider.node?.group === "Pass") {
      this.loadNextScene();
    } else if (otherCollider.node?.group === "GameOver") {
      this.reloadScene();
    } else if (otherCollider.node?.group === "Key") {
      this.onPickKey(otherCollider);
    }
  }
  loadNextScene() {
    loadNextScene();
  }
  reloadScene() {
    reloadScene();
  }
  onPickKey(key) {
    key.node.destroy();
    const Door = cc.find("Canvas/Door");
    if (Door) {
      Door.destroy();
    }
  }
}
