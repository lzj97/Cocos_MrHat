import global from "./utils/global";

const { ccclass, property } = cc._decorator;
@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Boolean)
  Mute: boolean = false;

  @property({
    type: cc.Integer,
    slide: true,
    min: 1,
    max: 10,
    step: 1,
  })
  Volume: number = 5;

  @property(cc.AudioClip)
  JumpAudio: cc.AudioClip = null;

  @property(cc.AudioClip)
  BackgroundAudio: cc.AudioClip = null;

  onLoad() {
    cc.game.addPersistRootNode(this.node);
    this.playBackgroundMusic();

    if (JSON.parse(cc.sys.localStorage.getItem(global.MUTE) || null)) {
      this.mute();
    }
  }
  start() {}
  play(clip: cc.AudioClip, loop?: boolean, volume: number = this.Volume) {
    if (this.Mute) return;
    cc.audioEngine.play(clip, loop, volume / 10);
  }
  mute() {
    this.Mute = true;
    cc.audioEngine.pauseAll();
    cc.sys.localStorage.setItem(global.MUTE, true);
  }
  phonation() {
    this.Mute = false;
    cc.audioEngine.resumeAll();
    cc.sys.localStorage.setItem(global.MUTE, false);
  }
  playBackgroundMusic() {
    this.play(this.BackgroundAudio, true);
  }
  playPlayerJumpEffect() {
    this.play(this.JumpAudio);
  }
}
