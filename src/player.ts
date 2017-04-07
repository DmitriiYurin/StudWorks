/** 
 * Описание персонажа
 */

import Scene from './scene'
import MainGameState from './states/game'
import Platform from './platform'

/** 
 * Класс персонажа
 */
class Player {

	/** 
	 * Указатель на сцену
	 */
	scene : Scene;

	/** 
	 * Указатель на DOM элемент с изображением
	 */
	sprite : HTMLImageElement;

	/** 
	 * Этап отображения анимации
	 */
	phase: number;

	/** 
	 * Х-Координата верхнего левого угла персонажа
	 */
	public X : number;

	/** 
	 * Y-Координата верхнего левого угла персонажа
	 */
	public Y : number;

	/** 
	 * Флаг - двигается ли спрайт
	 */
	isMoving : boolean;

	/** 
	 * Флаг - двигается ли спарйт вверъ
	 */
	isJumping : boolean;

	/** 
	 * Флаг - двигается ли спрайт вниз
	 */
	isFalling : boolean;

	/** 
	 * Текущая скорость движения вверх
	 */
	jumpSpeed : number;

	/** 
	 * Текущая скорость движения вниз
	 */
	fallSpeed : number;

	/** 
	 * Указатель на звук
	 */
	snd : HTMLAudioElement;

	/** 
	 * Указатель на игру
	 */
	_game : MainGameState;

	/** 
	 * Конструктор
	 * @param game Указатель на состояние игры
	 * @param scene Указатель на сцену
	 * @param snd Указатель на звук
	 */
	constructor(game: MainGameState, scene : Scene, playerSpriteURL: string, snd : HTMLAudioElement) {
		this.scene = scene;
		this.sprite = new Image();
		this.sprite.src = playerSpriteURL;
		this.phase = 0;
		this.isMoving = true;
		this.isJumping = true;
		this.isFalling = false;
		this.X = 250;
		this.Y = 400;
		this.jumpSpeed = 9;
		this.fallSpeed = 0;
		this.snd = snd;
		this._game = game;
		window['_gpoints'] = 0;
	}

	/** 
	 * Метод, отвечающий за отрисовку персонажа
	 */
	public Draw() {
		if(this.isJumping) this.CheckJump();
		if(this.isFalling) this.CheckFall();
		this.phase++;
		if (this.phase >= 14) {
			this.phase = 0;
		}
		try{
			this.scene.DrawImage(this.sprite, 0, (this.phase > 7 ? 0 : 1) * 95, 65, 95, this.X, this.Y);	
		} catch(e) {}

	}

	/** 
	 * Событие, возникающее при колизии с платформой
	 */
	public Jump(): void {
		if(!this.isJumping && !this.isFalling) {
			this.fallSpeed = 0;
			this.isJumping = true;
			this.jumpSpeed = 22;
		}
	}

	/** 
	 * Обработчик игровой логики в момент прыжка
	 */
	public CheckJump() : void {
		if(this.Y > 95 * 0.25) {
			this.SetPosition(this.X, this.Y - this.jumpSpeed);
		} else {
			if(this.jumpSpeed > 10) window['_gpoints'] += 100;
			this._game.platforms.forEach((platform, ind) => {
				platform.Y += this.jumpSpeed;
				
				if(platform.Y > 500)	 {
					//generate new platform
					let type = ~~(Math.random() * 5) == 0 ? 1 : 0;
					this._game.platforms[ind] = new Platform(
						Math.random() * 430, 
						platform.Y - 500, 
						type, this.scene, this);
				}
			});
		}
		this.jumpSpeed--;
		if(this.jumpSpeed == 0) {
			this.isJumping = false;
			this.isFalling = true;
			this.fallSpeed = 1;
		}
	}

	/** 
	 * Обработчик игровой логики в момент падения
	 */
	public CheckFall(): void {
		if(this.Y < 415) {
			this.SetPosition(this.X, this.Y + this.fallSpeed);
			this.fallSpeed++;
		} else {
			if(window['_gpoints'] == 0) this.fallStop();
			else {
				$("body")[0].dispatchEvent(new CustomEvent("GameOver", {
					detail: "GameOver"
				}));
				this.sprite = new HTMLImageElement();
				this.Draw();
			}
		}
	}
	
	/** 
	 * Метод принудительной остановки падения
	 * @param jmpSpeed Аттрибут задающий скорость движения вверх
	 */
	public fallStop(jmpSpeed : number = 0): void {
		this.isFalling = false;
		this.fallSpeed = 0;
		if (jmpSpeed > 0) {
			this.jumpSpeed = jmpSpeed;
		}
		this.Jump();
	}

	/** 
	 * Метод установки позиции спрайта в определённой точке
	 * @param x X координата
	 * @param y Y координата
	 */
	public SetPosition(x : number, y : number) : void {
		this.X = x;
		this.Y = y;
	}
	
	/** 
	 * Метод плавного перемещения по X координате персонажа
	 * @param theX желаемая координата по X
	 */
	public MoveTo(theX : number): void {
		this.SetPosition(theX - 70 / 2, this.Y);
		if (this.X >= 438) {
			this.SetPosition(437.5, this.Y);
		} else if (this.X <= 3) {
			this.SetPosition(3.5, this.Y);
		}
	}
}

export {
	Player as default
};