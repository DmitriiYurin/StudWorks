/** 
 * Основное состояние игры
 */

import EventListenerHelper from '../eventListenerHelper'
import Scene from '../scene'
import Player from '../player'
import Platform from '../platform'
import EndGameState from './end'

/** 
 * Класс логики игры
 */
class MainGameState {

	/** 
	 * Указатель на сцену
	 */
	scene : Scene;

	/** 
	 * Указатель на игрока
	 */
	player : Player;

	/** 
	 * Поле, которое хранит текущий счёт игры
	 */
	points: number;

	/** 
	 * Поле, которое хранит максимальный счёт, который достиг игрок
	 */
	highScore: number;

	/** 
	 * Текущее положение указателя по X координате
	 */
	mouseX: number;

	/** 
	 * Текущее положение указателя по Y координате
	 */
	mouseY: number;

	/** 
	 * Поле, содержащее указатель на обработчик основного игрового цикла
	 */
	gameLoopHandler: any;

	/** 
	 * Поле, содержащее массив платформ
	 */
	public platforms : Platform[];

	/** 
	 * Флаг, отвечающий за окончание игры
	 */
	weShouldStop: boolean;

	/** 
	 * Конструктор
	 * @param scene Указатель на сцену
	 * @param playerSpriteURL Ссылка на страйт персонажа
	 * @param snd Указатель на звук
	 */
	constructor(scene : Scene, playerSpriteURL: string, snd : HTMLAudioElement) {
		this.scene = scene;
		this.player = new Player(this, scene, playerSpriteURL, snd);
		this.points = 0;
		this.highScore = 0;
		this.weShouldStop = false;
	}

	/** 
	 * Метод перехода на экран игры
	 */
	public Start() : void {
		EventListenerHelper.CleanMouseEvents();
		$(this.scene.canvas).mousemove( (mse: JQueryMouseEventObject) => {
			this.player.MoveTo(mse.offsetX);
		});
		let nrOfPlatforms = 7;
		let position = 0;
		this.platforms = new Array<Platform>();
		for(let i : number = 0; i < nrOfPlatforms; i++) {
			let type : number = ~~(Math.random()*5) == 0 ? 1 : 0;

			this.platforms.push(new Platform(Math.random()*430, position, type, this.scene, this.player));
			
			if(position < 480) position += ~~(500 / nrOfPlatforms);
		}
		this.gameLoopHandler = setTimeout(() => {this.GameLoop()}, 1000 / 50);

		$("body")[0].addEventListener("GameOver", (event: CustomEvent) => {
			this.GameOver(); 
		});		
	}

	/** 
	 * Событие, возникающее при завершении игры
	 */
	private GameOver() {
		this.weShouldStop = true;
		this.gameLoopHandler = null;
		EventListenerHelper.CleanMouseEvents();
		//EventListenerHelper.RemoveAllListeners($("body")[0], "GameOver");
		new EndGameState(this.scene, this.points).ShowEndGameScreen();
	}

	/** 
	 * Основной игровой цикл
	 */
	private GameLoop() : void {
		this.scene.Clear();
		if (window['_gpoints'] > this.points) {
			this.points = window['_gpoints'];
		}
		if (this.points > this.highScore) {
			this.highScore = this.points;
		}
		this.scene.AddText("    HIGH:" + this.highScore.toString(), 10, "Black", 10, 500 - 22);
		this.scene.AddText("POINTS:" + this.points.toString(), 10, "Black", 10, 500 - 10);

		this.platforms.forEach((platform: any, index: any) => {
			if(platform.isMoving) {
				if(platform.X < 0) {
					platform.direction = 1;
				} else if(platform.X > 500 - 70) {
					platform.direction = -1;
				}
				platform.X += platform.direction * (index / 2) * ~~((this.points / 10000) % 8);
			}
			platform.Draw();
		});

		this.player.Draw();

		this.platforms.forEach( (e: any, ind: any) => {
			if((this.player.isFalling) &&
			   (this.player.X < e.X + 70) &&
			   (this.player.X + 65 > e.X) &&
			   (this.player.Y + 95 > e.Y) &&
			   (this.player.Y + 95 < e.Y + 20)
			  ) {
				e.onCollide();
			}
		});

		if (!this.weShouldStop) {
			this.gameLoopHandler = setTimeout(() => {this.GameLoop()}, 1000 / 50);
		}
	}
}

export {
	MainGameState as default
};