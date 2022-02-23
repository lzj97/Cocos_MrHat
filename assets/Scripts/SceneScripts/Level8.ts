const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  onLoad() {}

  onBeginContact(contact, selfCollider, otherCollider) {
    if (otherCollider.node?.group === "Player") {
      const Border = cc.find("Canvas/Border");

      Border.width += 400;
      Border.x -= 200;
      const MainCamera = cc.find("Canvas/Main Camera");
      if (MainCamera) {
        const CameraScript = MainCamera.getComponent("Camera");
        CameraScript.initData();
      }

      this.node.destroy();
    }
  }
}
