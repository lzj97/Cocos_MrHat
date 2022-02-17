const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  protected onLoad(): void {
    this.node.on(cc.Node.EventType.TOUCH_END, this.startPlay, this);
  }

  start() {}

  startPlay() {
    const index = this.node.getChildByName("Text")?.getComponent(cc.Label)?.string;

    cc.director.loadScene("Game" + index);
  }
}
