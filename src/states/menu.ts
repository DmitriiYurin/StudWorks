/** 
 * Экран выбора пола
 */

import Scene from '../scene'
import EventListenerHelper from '../eventListenerHelper'

/** 
 * Перечисление возможных полов
 */
enum SelectionState {
	None = 0,
	Boy,
	Girl
}

/** 
 * Класс экрана выбора пола
 */
class StartMenuState {

	/** 
	 * Поле, которое хранит указатель на сцену
	 */
	scene : Scene;

	/** 
	 * Поле, указывающее на пол, на котором находится указатель
	 */
	currentSelection: SelectionState = 0;

	/** 
	 * Поле, хранящее выбранный пол
	 */
	selectedGender: SelectionState = 0;

	/** 
	 * Флаг успешной установки обработчиков
	 */
	hooksInstalled: boolean = false;

	/** 
	 * Конструктор
	 * @param scene Указатель на сцену
	 */
	constructor(scene : Scene) {
		this.scene = scene;
	}

	/** 
	 * Метод, регистрирующий обработчики
	 */
	private BindListerners(): void {
		if (!this.hooksInstalled) {
			this.hooksInstalled = true;
			EventListenerHelper.CleanMouseEvents();
			$(document).mousemove((e: JQueryMouseEventObject) => {
				var canvas = this.scene.canvas
				var targetingCanvas : boolean = canvas === e.target;
				if (targetingCanvas) {
					var posLeftCenter : number = e.pageX - canvas.offsetLeft;
					if (posLeftCenter < (canvas.offsetWidth / 2)) {
						this.currentSelection = SelectionState.Boy;
					} else {
						this.currentSelection = SelectionState.Girl;
					}
				} else {
					this.currentSelection = SelectionState.None;
				}
				this.MainMenu();
			});	
			$(document).mousedown((e: JQueryMouseEventObject) => {
				var canvas = this.scene.canvas
				var targetingCanvas : boolean = canvas === e.target;
				if (targetingCanvas) {
					EventListenerHelper.CleanMouseEvents();
					this.selectedGender = this.currentSelection;
					$("body")[0].dispatchEvent(new CustomEvent("genderSelected", {
						detail: this.selectedGender === 1 ? "Boy" : "Girl"
					}));
				}
			});
		}
	}

	/** 
	 * Метод перехода к экрану выбора пола
	 */
	public MainMenu(): any {
		this.scene.Clear();
		this.BindListerners();
		if (this.currentSelection === SelectionState.Boy) {
			this.scene.AddRect(250, 0, 500, 500, "Grey");
		} else if (this.currentSelection === SelectionState.Girl) {
			this.scene.AddRect(0, 0, 250, 500, "Grey");
		} else if (this.currentSelection === SelectionState.None) {
			this.scene.AddRect(0, 0, 500, 500, "Grey");
		}
		this.scene.AddText("SELECT YOUR GENDER", 20, "Black", 100, 200);
		this.scene.AddText("BOY", 10, "Black", 156, 250);
		this.scene.AddText("GIRL", 10, "Black", 318, 250);
		return 0;
	}
}

export {
	StartMenuState as default
};