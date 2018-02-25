// 初始化整个游戏的精灵，作为游戏开始的入口
import { ResourcesLoader } from './base/ResourcesLoader.js';
import { Background } from './runtime/Background.js';
import { DataStore } from './base/DataStore.js';
import { Director } from './Director.js';
import { Land } from './runtime/Land.js';
import { Birds } from './player/Birds.js';
import { StartButton } from './player/StartButton.js';
import { Score } from './player/Score.js';

export class Main {
  constructor() {
    this.canvas = document.getElementById('game');
    this.ctx = this.canvas.getContext('2d');
    this.dataStore = DataStore.getInstance();
    this.director = Director.getInstance();
    const loader = new ResourcesLoader();
    loader.onloaded(map => this.onResourceFirstLoaded(map));
  }

  // 资源加载完毕之后进行的操作
  onResourceFirstLoaded(map) {
    this.dataStore.ctx = this.ctx;
    this.dataStore.res = map;
    this.init();
  }

  init() {
    //首先重置游戏是没有结束的
    this.director.isGameOver = false;
    this.dataStore
      .put('background', Background)
      .put('land', Land)
      .put('pencils', [])
      .put('birds', Birds)
      .put('startButton', StartButton)
      .put('score', Score);

    //创建铅笔要在游戏逻辑运行之前
    this.director.createPencil();
    this.director.run();
    this.registerEvent()
  }

  registerEvent() {
    this.canvas.addEventListener('touchstart', e => {
      //屏蔽掉JS的事件冒泡
      e.preventDefault();
      if (this.director.isGameOver) {
        console.log('游戏开始');
        this.init();
      } else {
        this.director.birdsEvent();
      }
    });
  }
}
