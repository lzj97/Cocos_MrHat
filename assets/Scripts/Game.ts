const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    cc.director.getPhysicsManager().enabled = true;
    cc.director.getCollisionManager().enabled = true;
    cc.director.getCollisionManager().enabledDrawBoundingBox = true;
  }

  start() {}

  update(dt) {}
}
