/** 
 * Вспомогательный класс для отвязки обработчиков событий, генерируемых мышью.
 */

/// <reference path="../node_modules/@types/jquery/index.d.ts" />

/** 
 * Вспомогательный класс для отвязки обработчиков событий, генерируемых мышью.
 */
class EventListenerHelper {

	/** 
	 * Пустой конструктор класса
	 */
	constructor	() { };

	/** 
	 * Статичный метод для отвязки обработчиков событий, генерируемых мышью.
	 */
	public static CleanMouseEvents(): void {
		$(document).unbind("mousemove");
		$(document).unbind("mousedown");
		$(document).unbind("mouseup");
		$("#c").unbind("mousemove");
		$("#c").unbind("mousedown");
		$("#c").unbind("mouseup");
	}
}

export {
	EventListenerHelper as default
};