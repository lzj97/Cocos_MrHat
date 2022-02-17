const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  onLoad() {
    this.node.on(
      cc.Node.EventType.TOUCH_END,
      () => {
        cc.director.loadScene("LevelList");
      },
      this
    );
  }

  start() {}

  // update (dt) {}
}
