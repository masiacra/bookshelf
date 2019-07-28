//Контроллер (умный компонент) приложения
class App {
	constructor(element, cb) {
		this.element = element;
		this.data = null;
		this.cb = cb;
		
		//Подписываемся на прослушку событий
		this.element.addEventListener('delete', 
			this.deleteHandler.bind(this));
		this.element.addEventListener('edit', 
			this.editHandler.bind(this));
		this.element.addEventListener('save', 
			this.saveHandler.bind(this));
	}
	
	render(url, cb) {
		fetch(url)
			.then(response => response.json())
			.then(data => {
				this.data = data;
				cb(data);
			});
	}
	
	deleteHandler(evt) {
		const detail = evt.detail;
		const id = detail.id;
		this.data.splice(id, 1);
	}
	
	editHandler(evt) {
		const detail = evt.detail;
		const id = detail.id;
		const book = this.data[id];
		this.cb(book);
	}
	
	saveHandler(evt) {
		const book = evt.detail;
		
		if (book.id === null) {
			book.id = this.data[data.length];
		} 
		
		this.data.push(book);
		console.log(this.data);
		
	}
	
	//Подписка на событие
	on(nameOfEvt, callback) {
		const data = this.data; 
		this.element.addEventListener(nameOfEvt, callback);
	}
	
}
