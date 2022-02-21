const { ccclass, property } = cc._decorator;
import global from "./utils/global";

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Prefab)
  SignPrefab: cc.Prefab = null;

  @property(cc.Integer)
  count: number = 22;

  @property(cc.Integer)
  page: number = 2;

  ListBox: cc.Node = null;
  Pagination: cc.Node = null;

  pageSize: number = 10;
  rowCount: number = 2;
  columnCount: number = 5;

  passedCount: number = 0;

  protected onLoad(): void {
    this.ListBox = this.node.getChildByName("ListBox");
    this.Pagination = this.node.getChildByName("Pagination");

    const Prev = this.Pagination.getChildByName("Prev");
    const Next = this.Pagination.getChildByName("Next");
    Prev.on(cc.Node.EventType.TOUCH_END, () => this.changePage(this.page - 1), this);
    Next.on(cc.Node.EventType.TOUCH_END, () => this.changePage(this.page + 1), this);

    this.node.getChildByName("Home").on(cc.Node.EventType.TOUCH_END, this.goMain, this);

    this.passedCount = JSON.parse(cc.sys.localStorage.getItem(global.PASSED_COUNT)) || 0;
  }

  start() {
    this.renderList();
  }

  renderList() {
    const indexArr: number[] = [];
    for (let i = 1; i <= this.count; i++) {
      if (i > (this.page - 1) * this.pageSize && i <= this.page * this.pageSize) {
        indexArr.push(i);
      }
    }

    indexArr.forEach((text: number, index: number) => {
      const sign = cc.instantiate(this.SignPrefab);
      sign.parent = this.ListBox;

      const Text = sign.getChildByName("Text");

      if (this.passedCount + 1 < text) {
        Text.active = false;
        sign.getChildByName("Lock").active = true;
      } else {
        Text.getComponent(cc.Label).string = String(text);
      }
      const intervalX = (this.ListBox.width - this.columnCount * sign.width) / 4;
      const intervalY = this.ListBox.height - this.rowCount * sign.height;

      const x = (index % this.columnCount) * (intervalX + sign.width) + sign.width / 2;
      const y = -Math.floor(index / this.columnCount) * (intervalY + sign.height) - sign.height / 2;

      sign.setPosition(x, y);
    });

    const FirstNumber = this.Pagination.getChildByName("FirstNumber");
    const LastNumber = this.Pagination.getChildByName("LastNumber");
    FirstNumber.getComponent(cc.Label).string = String((this.page - 1) * this.pageSize + 1);
    LastNumber.getComponent(cc.Label).string = String(this.page * this.pageSize);
  }

  changePage(p: number) {
    if (p < 1 || p > Math.ceil(this.count / this.pageSize)) return;
    const children = this.ListBox.children;
    children.forEach((node) => {
      node.destroy();
    });
    this.page = p;
    this.renderList();
  }

  goMain() {
    cc.director.loadScene("Main");
  }
}
