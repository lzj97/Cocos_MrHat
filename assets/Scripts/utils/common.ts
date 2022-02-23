import global from "./global";
import GlobalStore from "../GlobalStore";

// 暂停/恢复游戏
export function pauseGame(paused: boolean) {
  const GlobalStore: GlobalStore = cc.director
    .getScene()
    .getChildByName("GlobalStore")
    .getComponent("GlobalStore");
  GlobalStore.pauseGame(paused);
}

// 重新加载当前场景
export function reloadScene() {
  cc.director.loadScene(cc.director.getScene().name);
  pauseGame(false);
}

// 加载下一个场景
export function loadNextScene() {
  const sceneName = cc.director.getScene().name;
  const index = Number(sceneName.replace("Level", ""));
  if (Number(cc.sys.localStorage.getItem(global.PASSED_COUNT) || 0) < index) {
    cc.sys.localStorage.setItem(global.PASSED_COUNT, index);
  }
  pauseGame(false);
  if (index < global.levelCount) {
    cc.director.loadScene(`Level${index + 1}`);
  } else {
    cc.director.loadScene(`LastLevel`);
  }
}
