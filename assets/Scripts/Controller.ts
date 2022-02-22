import global from "./utils/global";
import GlobalStore from "./GlobalStore";
import Toast from "./utils/Toast";

const { ccclass, property } = cc._decorator;
@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Integer)
  speed: number = 200;

  @property(cc.Integer)
  jumpSpeed: number = 1200;

  @property(cc.Boolean)
  ContinuousJump: boolean = true;

  Player: cc.Node = null;
  GlobalStore: GlobalStore = null;

  leftLongPress: boolean = false;
  rightLongPress: boolean = false;
  rigidbody: cc.RigidBody = null;

  onLoad() {
    this.Player = cc.find("Canvas/Player");

    this.GlobalStore = cc.director
      .getScene()
      .getChildByName("GlobalStore")
      .getComponent("GlobalStore");

    if (JSON.parse(cc.sys.localStorage.getItem(global.MUTE) || null)) {
      this.mute();
    }

    const Left = this.node.getChildByName("Left");
    Left.on(cc.Node.EventType.TOUCH_START, () => (this.leftLongPress = true), this);
    Left.on(cc.Node.EventType.TOUCH_END, () => (this.leftLongPress = false), this);
    Left.on(cc.Node.EventType.TOUCH_CANCEL, () => (this.leftLongPress = false), this);

    const Right = this.node.getChildByName("Right");
    Right.on(cc.Node.EventType.TOUCH_START, () => (this.rightLongPress = true), this);
    Right.on(cc.Node.EventType.TOUCH_END, () => (this.rightLongPress = false), this);
    Right.on(cc.Node.EventType.TOUCH_CANCEL, () => (this.rightLongPress = false), this);

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
    this.GlobalStore.playPlayerJumpEffect();
  }

  reload() {
    const sceneName = cc.director.getScene()?.name;
    cc.director.loadScene(sceneName);
  }
  pause() {
    const PauseDialog = this.node.getChildByName("PauseDialog");
    PauseDialog.active = true;
  }
  goMain() {
    cc.director.loadScene("Main");
  }
  play() {
    const PauseDialog = this.node.getChildByName("PauseDialog");
    PauseDialog.active = false;
  }
  mute() {
    const Phonation = cc.find("Canvas/Controller/PauseDialog/Phonation");
    Phonation.active = false;
    const Mute = cc.find("Canvas/Controller/PauseDialog/Mute");
    Mute.active = true;
    this.GlobalStore.mute();
  }
  phonation() {
    const Phonation = cc.find("Canvas/Controller/PauseDialog/Phonation");
    Phonation.active = true;
    const Mute = cc.find("Canvas/Controller/PauseDialog/Mute");
    Mute.active = false;
    this.GlobalStore.phonation();
  }
  help() {
    const TipsDialog = this.node.getChildByName("TipsDialog");
    TipsDialog.active = true;
  }
  closeHelp() {
    const TipsDialog = this.node.getChildByName("TipsDialog");
    TipsDialog.active = false;
  }
  playAdv() {
    Toast("该功能暂未完成");
  }
}
