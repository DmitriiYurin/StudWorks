/** 
 * Сцена
 */

/// <reference path="../node_modules/@types/jquery/index.d.ts" />

/** 
 * Класс сцена
 */
class Scene {

	/** 
	 * Поле где хранится ширина сцены 
	 */
	private width : number;

	/** 
	 * Поле где хранится высота сцены 
	 */
	private height : number;

	/** 
	 * Поле указывающее на 2D конекст DOM-элемента canvas
	 */
	private ctx : CanvasRenderingContext2D;

	/** 
	 * Поле, содержащее шрифт по умолчанию для методов отрисовки текста  
	 */
	private font : string;

	/** 
	 * Аттрибут, указывающий на DOM-элемент canvas 
	 */
	public get canvas() : HTMLCanvasElement {
		return <HTMLCanvasElement> $("#c")[0];
	}

	/** 
	 * Конструктор класса сцены
	 * @param width Ширина сцены
	 * @param height Высота сцены
	 * @param font Шрифт для текста
	 */
	constructor(width : number, height : number, font : string = "Arial") {
		var canvas = <HTMLCanvasElement> $("<canvas>")[0];
		canvas.id = 'c';
		canvas.width = this.width = width;
		canvas.height = this.height = height;
		$("#c").remove();
		$(".content").html(canvas.outerHTML);
		this.ctx = this.canvas.getContext('2d');
		this.font = font;
		setTimeout(this.Clear(), 500);
	}

	/** 
	 * Очистка сцены и заливка приятным светло голубым цветом
	 */
	public Clear(): void {
		this.ctx.fillStyle = "#D0E7F9";
		this.ctx.beginPath();
		this.ctx.rect(0,0, this.width, this.height);
		this.ctx.closePath();
		this.ctx.fill();
	}	

	/** 
	 * Метод добавляющий текст на сцену
	 * @param text Добавляемый текст
	 * @param size Размер шрифта
	 * @param color Цвет текста
	 * @param x Х-Координата относительно сцены
	 * @param y Y-Координата относительно сцены
	 */
	public AddText(text: string, size: number, color: string, x: number, y: number) : void {
		this.ctx.font = size.toString()+"pt "+this.font;
		this.ctx.fillStyle = color;
		this.ctx.fillText(text,x,y);
	}

	/** 
	 * Метод добавлящий прямоугольник на сцену
	 * @param x X-Координата верхнего левого угла прямоугольника
	 * @param y Y-Координата верхнего левого угла прямоугольника
	 * @param width Ширина прямоугольника
	 * @param height Высота прямоугльника
	 * @param color Цвет прямоугольника
	 */
	public AddRect(x: number, y: number, width: number, height: number, color: string): void {
		this.ctx.fillStyle = color;
		this.ctx.fillRect(x, y, width, height);
	}

	/** 
	 * Метод добавляющий изобращение на сцену
	 * @param img DOM-элемент с изображением
	 * @param offsetX смещение по Х-координате относительно изображения
	 * @param offsetY смещение по Y-координате относительно изображения
	 * @param width ширина изображения
	 * @param height выстора изображения
	 * @param x Х-Координата на сцене, где разместить верхний левый угол изображения
	 * @param y Y-Координата на сцене, где разместить верхний левый угол изображения
	 */
	public DrawImage(img: HTMLImageElement, offsetX: number, offsetY: number, width: number, height: number, x: number, y: number): void {
		this.ctx.drawImage(img, offsetX, offsetY, width, height, x, y, width, height);
	}

	/** 
	 * Метод добавляющий класс Платформа с определённым граниентным цветом
	 * @param x Х-Координата на сцене, где разместить верхний левый угол платформы
	 * @param y Y-Координата на сцене, где разместить верхний левый угол платформы
	 * @param color1 Первый цвет градиента
	 * @param color2 Второй цвет градиента
	 */
	public AddPlatform(x: number, y:number, color1: string, color2: string): void {
		this.ctx.fillStyle = 'rgba(255, 255, 255, 1)';
		let gradient = this.ctx.createRadialGradient(x + (70 / 2), y + (20 / 2), 5, x + (70 / 2), y + (20 / 2), 45);
		gradient.addColorStop(0, color1);
		gradient.addColorStop(1, color2);
		this.ctx.fillStyle = gradient;
		this.ctx.fillRect(x, y, 70, 20);
	}
}

export {
	Scene as default
};