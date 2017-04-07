/** 
 * Экран конца игры
 */

import Scene from '../scene'
import EventListenerHelper from '../eventListenerHelper'
import StartMenuState from './menu'

/** 
 * Класс-состояние конца игры
 */
class EndGameState {

	/** 
	 * Поле, которое хранит указатель на сцену
	 */
	scene : Scene;

	/** 
	 * Поле, которое хранит счёт, с которым завершилась игра
	 */
	score : number;

	/** 
	 * Конструктор
	 * @param scene Указатель на сцену
	 * @param score Счет
	 */
	constructor (scene : Scene, score: number) {
		this.scene = scene;
		this.score = score;
		$(document).mousedown( (e: JQueryMouseEventObject) => {
			EventListenerHelper.CleanMouseEvents();
			new StartMenuState(this.scene).MainMenu();
		});
	}

	/** 
	 * Метод переключения состояние игры на завершающий 
	 */
	public ShowEndGameScreen() : void {
		this.scene.Clear();
		this.scene.AddText("Game over", 40, "Black", 120, 100);
		this.scene.AddText("Your score: " + this.score.toString(), 20, "Black", 140, 150);
		this.scene.AddText("Click to play again", 20, "Black", 140, 200);
	}

}

export {
	EndGameState as default
};