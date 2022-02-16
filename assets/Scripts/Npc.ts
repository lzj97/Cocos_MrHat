// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Node)
  mainCamera: cc.Node = null;
  // onLoad () {}

  start() {
    // const ttt = cc.tween(this.node).to(2, { scale: 2 }).start();
    // setTimeout(() => {
    //   ttt.stop();
    //   cc.tween(this.node)
    //     .by(2, { position: cc.v3(100, 0, 0) })
    //     .start();
    // }, 1000);
  }

  onBeginContact() {
    const CameraScript = this.mainCamera.getComponent("Camera");
    CameraScript.extendMap();
    this.node.destroy();
  }
}
