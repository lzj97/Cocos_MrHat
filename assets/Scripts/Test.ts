// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  currentY: number = 0;
  touchTargetY: number = 0;
  onLoad() {
    this.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
    this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
  }

  start() {}

  update(dt) {}

  touchStart(event) {
    console.log(event.touch.getLocation().y);

    this.currentY = this.node.convertToWorldSpaceAR(cc.v2(0, 0)).y;
    console.log(this.currentY);
  }
  touchMove(event) {
    this.touchTargetY = this.node.convertToNodeSpaceAR(event.touch.getLocation()).y;
  }
}
