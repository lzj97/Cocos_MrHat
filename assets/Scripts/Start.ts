// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  onLoad() {
    this.node.on(
      cc.Node.EventType.TOUCH_END,
      () => {
        cc.director.loadScene("Game1");
      },
      this
    );
  }

  start() {}

  // update (dt) {}
}
