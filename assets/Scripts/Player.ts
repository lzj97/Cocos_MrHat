const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  // onLoad () {}

  start() {}

  // update (dt) {}

  onBeginContact(contact, selfCollider, otherCollider) {
    if (otherCollider.node?.group === "Pass") {
      this.loadNextScene();
    } else if (otherCollider.node?.group === "GameOver") {
      cc.director.loadScene("Level1");
    }
  }
  loadNextScene() {
    const sceneName = cc.director.getScene().name;
    const index = sceneName.replace("Level", "");
    cc.director.loadScene(`Level${Number(index) + 1}`);
  }
}
