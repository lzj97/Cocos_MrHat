const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Prefab)
  indexSign: cc.Prefab = null;

  @property(cc.Integer)
  count: number = 22;

  @property(cc.Integer)
  page: number = 2;

  start() {
    this.renderList();
  }

  renderList() {
    const indexArr: number[] = [];
    const pageSize = 10;
    for (let i = 1; i <= this.count; i++) {
      if (i >= (this.page - 1) * pageSize && i <= this.page * pageSize) {
        indexArr.push(i);
      }
    }

    indexArr.forEach((text, index) => {
      const sign = cc.instantiate(this.indexSign);
      sign.parent = this.node;
      sign.getChildByName("Text").getComponent(cc.Label).string = text + "";

      sign.setPosition(text * 10, 0);
    });
  }
}
