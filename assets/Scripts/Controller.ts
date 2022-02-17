const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Integer)
  speed: number = 200;

  @property(cc.Integer)
  jumpSpeed: number = 800;

  @property(cc.Boolean)
  ContinuousJump: boolean = true;

  Player: cc.Node = null;
  leftLongPress: boolean = false;
  rightLongPress: boolean = false;
  rigidbody: cc.RigidBody = null;

  onLoad() {
    this.Player = cc.find("Canvas/Player");

    const Left = this.node.getChildByName("Left");
    Left.on(cc.Node.EventType.TOUCH_START, () => (this.leftLongPress = true), this);
    Left.on(cc.Node.EventType.TOUCH_END, () => (this.leftLongPress = false), this);

    const Right = this.node.getChildByName("Right");
    Right.on(cc.Node.EventType.TOUCH_START, () => (this.rightLongPress = true), this);
    Right.on(cc.Node.EventType.TOUCH_END, () => (this.rightLongPress = false), this);

    const Jump = this.node.getChildByName("Jump");
    Jump.on(cc.Node.EventType.TOUCH_START, this.jumpAction, this);

    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
  }
  onKeyDown(event) {
    if (event.keyCode === 65) {
      this.leftLongPress = true;
    }
    if (event.keyCode === 68) {
      this.rightLongPress = true;
    }
    if (event.keyCode === 32) {
      this.jumpAction();
    }
  }
  onKeyUp(event) {
    if (event.keyCode === 65) {
      this.leftLongPress = false;
    }
    if (event.keyCode === 68) {
      this.rightLongPress = false;
    }
  }

  start() {
    this.rigidbody = this.Player.getComponent(cc.RigidBody);
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

    if (!this.ContinuousJump && v.y !== 0) {
      return;
    }
    v.y = this.jumpSpeed;
    this.rigidbody.linearVelocity = v;
  }

  help() {}
  reload() {
    const sceneName = cc.director.getScene()?.name;
    // const index = sceneName.charAt(sceneName.length - 1);
    cc.director.loadScene(sceneName);
  }
  pause() {
    const PauseOptions = this.node.getChildByName("PauseOptions");
    PauseOptions.active = true;
  }
  goHome() {
    cc.director.loadScene("Start");
  }
  play() {
    const PauseOptions = this.node.getChildByName("PauseOptions");
    PauseOptions.active = false;
  }
  mute() {
    const Phonation = cc.find("Canvas/UI/PauseOptions/Phonation");
    Phonation.active = false;
    const Mute = cc.find("Canvas/UI/PauseOptions/Mute");
    Mute.active = true;
  }
  phonation() {
    const Phonation = cc.find("Canvas/UI/PauseOptions/Phonation");
    Phonation.active = true;
    const Mute = cc.find("Canvas/UI/PauseOptions/Mute");
    Mute.active = false;
  }
}
