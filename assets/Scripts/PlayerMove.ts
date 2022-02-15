// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Sprite)
  player: cc.Sprite = null;

  @property(cc.Button)
  leftBtn: cc.Button = null;

  @property(cc.Button)
  rightBtn: cc.Button = null;

  @property(cc.Button)
  jumpBtn: cc.Button = null;

  @property(Number)
  speed: number = 20;

  @property({
    visible: false,
  })
  leftLongPress: boolean = false;
  @property({
    visible: false,
  })
  rightLongPress: boolean = false;
  @property({
    visible: false,
  })
  rigidbody: cc.RigidBody = null;

  onLoad() {
    this.leftBtn.node.on(
      cc.Node.EventType.TOUCH_START,
      () => {
        this.leftLongPress = true;
      },
      this
    );
    this.leftBtn.node.on(
      cc.Node.EventType.TOUCH_END,
      () => {
        this.leftLongPress = false;
      },
      this
    );
    this.rightBtn.node.on(
      cc.Node.EventType.TOUCH_START,
      () => {
        this.rightLongPress = true;
      },
      this
    );

    this.rightBtn.node.on(
      cc.Node.EventType.TOUCH_END,
      () => {
        this.rightLongPress = false;
      },
      this
    );
    this.jumpBtn.node.on(cc.Node.EventType.TOUCH_START, this.jumpAction, this);
  }

  start() {
    this.rigidbody = this.getComponent(cc.RigidBody);
  }

  update(dt) {
    const v = this.rigidbody.linearVelocity;
    if (this.leftLongPress) {
      v.x = -this.speed * 150 * dt;
    } else if (this.rightLongPress) {
      v.x = this.speed * 150 * dt;
    } else {
      v.x = 0;
    }
    this.rigidbody.linearVelocity = v;
  }

  jumpAction() {
    const v = this.rigidbody.linearVelocity;
    v.y = 800;
    this.rigidbody.linearVelocity = v;
  }
}
