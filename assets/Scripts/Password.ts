const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.String)
  password: string = "";

  @property(cc.Node)
  Door: cc.Node = null;

  Input: cc.Label = null;
  inputLock: boolean = false;
  placholder: string = "请输入密码";
  inputText: string = "";
  onLoad() {
    this.Input = this.getComponentInChildren(cc.Label);
  }

  start() {}

  update() {
    if (this.inputText) {
      this.Input.string = this.inputText;
    } else {
      this.Input.string = this.placholder;
    }
  }

  onKeyDown(event, keyCode: string) {
    if (keyCode === "close") {
      this.close();
    } else if (keyCode === "clear") {
      this.inputText = "";
    } else if (keyCode === "confirm") {
      this.confirm();
    } else {
      if (this.inputLock) return;
      this.inputText += keyCode;
    }
  }
  open() {
    this.node.active = true;
  }
  close() {
    this.inputText = "";
    this.node.active = false;
  }
  confirm() {
    if (this.inputText !== this.password) {
      this.inputText = "密码错误";
      this.inputLock = true;
      setTimeout(() => {
        this.inputText = "";
        this.inputLock = false;
      }, 1000);
    } else {
      this.Door.destroy();
      this.close();
    }
  }
}
