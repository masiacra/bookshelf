//Контроллер (умный компонент) приложения
class App {
	constructor(element, data, cb, cb2, cb3) {
		this.element = element;
		this.data = data;
		this.cb = cb;
		
		this.cb2 = cb2;
		this.cb3 = cb3;
		
		
		//Подписываемся на прослушку событий
		this.element.addEventListener('delete', 
			this.deleteHandler.bind(this));
		this.element.addEventListener('edit', 
			this.editHandler.bind(this));
		this.element.addEventListener('save', 
			this.saveHandler.bind(this));
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
		const id = book.id;
		if (id === null) {
			book.id = this.data[this.data.length];
			this.data.push(book);
			this.cb2(book);
		} else {
			this.data[book.id] = book;
			this.cb3(book);
		}	
	}
	
	
}
