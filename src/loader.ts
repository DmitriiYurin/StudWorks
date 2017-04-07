/**
 * Загрузчик приложения
 */

/// <reference path="../node_modules/@types/jquery/index.d.ts" />
;

import * as $ from 'jquery';
import Scene from './scene';
import StartMenuState from './states/menu';
import MainGameState from './states/game';
import EventListenerHelper from './eventListenerHelper';


class GameLoader {

	/** 
	 * Поле, чтобы хранить звук прыжка
	 */
	protected snd : HTMLAudioElement;

	/** 
	 * Поле, чтобы хранить указатель на класс "Сцена"
	 */
	protected scene : Scene;

	/** 
	 * Конструктор класса загрузчика
	 */
	constructor() {
		window['jQuery'] = window['$'] = $;
		window['_gpoints'] = 0;
		let style = document.createElement('link');
		style.setAttribute("rel","stylesheet")
		style.setAttribute("type","text/css")
		style.setAttribute("href","style.min.css");
		$("head")[0].appendChild(style);
		$("script").remove();
		$("<div>")
			.addClass("content")
			.html("Loading...")
			.appendTo($("body"));
		$(".content").wrap($("<div>").addClass("wrapper"));
		setTimeout(this.LoadExternalResources(),500);
	}

	/** 
	 * Метод для загрузки звука прыжка
	 */
	private LoadExternalResources(): void {
		this.snd = new Audio("bounce.mp3");
		this.snd.load();
		$(".content").append("<br />Sounds loaded.");
		setTimeout(this.PrepareScene(),500);
	}

	/** 
	 * Метод подготовки сцены, и установки обработчика события выбора пола персонажа
	 */
	private PrepareScene(): void {
		this.scene = new Scene(500, 500);
		this.scene.Clear();
		$(this.scene.canvas).css("cursor", "none");
		this.scene.AddText("Scene loaded.",20,"Red",100,100);
		new StartMenuState(this.scene).MainMenu();
		$("body")[0].addEventListener("genderSelected", (event: CustomEvent) => { this.SwitchToGameState(event.detail); });
	}

	/** 
	 * Метод перехода к игре
	 * @param gender Поле, принимающий пол персонажа (Boy либо Girl)
	 */
	private SwitchToGameState(gender: string): void {
		//EventListenerHelper.RemoveAllListeners($("body")[0], "genderSelected");
		let spriteFileName: string = "jump-" + gender.toLowerCase() + ".png";
		new MainGameState(this.scene, spriteFileName, this.snd).Start();
	}
}

export {
	GameLoader as default
};