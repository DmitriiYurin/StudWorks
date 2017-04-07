/** 
 * Платформа
 */

import Scene from './scene'
import Player from './player'

/** 
 * Класс имплементирующий платформу
 */
class Platform {
	
	/** 
	 * Поле отвечающее за тип платформы (0 - обычная, 1 - "бонусная")
	 */
	type : number;

	/** 
	 * Поле, указывающее на верхний левый угол платформы по Х координате
	 */
	public X : number;

	/** 
	 * Поле, указывающее на верхний левый угол платформы по Y координате
	 */
	public Y : number;

	/** 
	 * Поле отвечающее на цвет платформы 
	 */
	firstColor: string;

	/** 
	 * Поле отвечающее на цвет платформы 
	 */
	secondColor: string;

	/** 
	 * Поле отвечающее за возможность движения платформы
	 */
	isMoving : boolean;

	/** 
	 * Поле, указывающее на сторону, в которую будет двигаться платформа (-1 = влево, 1 = вправо)
	 */
	direction : number;

	/** 
	 * Поле, содержащее указатель на сцену
	 */
	scene: Scene;

	/** 
	 * Поле, содержащее указатель на персонажа
	 */
	player: Player;

	/** 
	 * Конструктор платформы
	 * @param x Верхний левый угол платформы по Х координате
	 * @param y Верхний левый угол платформы по Y координате
	 * @param type Аргумент, задающий тип платформы
	 * @param scene Указатель на сцену
	 * @param player Указатель на персонажа
	 */
	constructor(x:number, y:number, type:number, scene: Scene, player: Player) {
		this.X = x;
		this.Y = y;
		this.type = type;
		this.isMoving = Math.random() >= 0.5
		this.direction = Math.random() >= 0.5 ? -1 : 1;
		if(type == 1) {
			this.firstColor = '#AADD00';
			this.secondColor = '#698B22';
		} else {
			this.firstColor = '#FF8C00';
			this.secondColor = '#EEEE00';
		}
		this.scene = scene;
		this.player = player;
	}
	
	/** 
	 * Событие, вознимкающее при успешной проверке колизии.
	 */
	public onCollide(): void {
		this.player.fallStop(this.type === 1 ? 50 : 0);
	}
	
	/** 
	 * Метод отвечающий за отрисовку платформы на сцене.
	 */
	public Draw() : void {
		this.scene.AddPlatform(this.X, this.Y, this.firstColor, this.secondColor);
	}

};

export {
	Platform as default
};