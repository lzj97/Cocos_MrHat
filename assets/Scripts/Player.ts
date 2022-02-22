const { ccclass, property } = cc._decorator;
import GlobalStore from "./GlobalStore";
import global from "./utils/global";

@ccclass
export default class NewClass extends cc.Component {
  GlobalStore: GlobalStore = null;
  onLoad() {
    this.GlobalStore = cc.director
      .getScene()
      .getChildByName("GlobalStore")
      .getComponent("GlobalStore");
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
    const index = Number(sceneName.replace("Level", ""));
    if (Number(cc.sys.localStorage.getItem(global.PASSED_COUNT) || 0) < index) {
      cc.sys.localStorage.setItem(global.PASSED_COUNT, index);
    }
    cc.director.loadScene(`Level${index + 1}`);
    this.GlobalStore.pauseGame(false);
  }
  reloadScene() {
    cc.director.loadScene(cc.director.getScene().name);
    this.GlobalStore.pauseGame(false);
  }
  onPickKey(key) {
    key.node.destroy();
    const Door = cc.find("Canvas/Door");
    if (Door) {
      Door.destroy();
    }
  }
}
