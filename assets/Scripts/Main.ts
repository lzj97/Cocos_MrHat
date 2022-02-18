const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  start() {}

  goLevelList() {
    cc.director.loadScene("LevelList");
  }
}
