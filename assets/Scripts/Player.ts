const { ccclass, property } = cc._decorator;
import GlobalAudio from "./GlobalAudio";
import global from "./utils/global";

@ccclass
export default class NewClass extends cc.Component {
  GlobalAudio: GlobalAudio = null;
  onLoad() {
    this.GlobalAudio = cc.director
      .getScene()
      .getChildByName("GlobalAudio")
      .getComponent("GlobalAudio");
  }
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
    const sceneName = cc.director.getScene().name;
    const index = sceneName.replace("Level", "");
    cc.sys.localStorage.setItem(global.PASSED_COUNT, index);
    cc.director.loadScene(`Level${Number(index) + 1}`);
  }
  reloadScene() {
    cc.director.loadScene(cc.director.getScene().name);
  }
  onPickKey(key) {
    key.node.destroy();
    const Door = cc.find("Canvas/Door");
    if (Door) {
      Door.destroy();
    }
  }
}
