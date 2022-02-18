const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  onLoad() {
    const sceneName = cc.director.getScene()?.name;
    const index = sceneName.replace("Level", "");
    this.node.getChildByName("Text").getComponent(cc.Label).string = `第${index}关`;
  }

  start() {}

  // update (dt) {}
}
