//Форма редактирования/сохранения данных
class CommonForm {
	constructor(form) {
		this.form = form;
		this.bookId = null;	
		
		this.form.onclick = this.clickHandler.bind(this);
		this.form.oninput = this.onInput.bind(this);
		
	}
	
	clickHandler(evt) {
		const target = evt.target;
		evt.preventDefault();
		if (target.tagName !== 'BUTTON') return;
		if (target.classList.contains('save')) {
			this.saveBtnHandler();
		} else {
			this.hide();
		}
	}
	
	sayAlarm() {
		if (!this.form.classList.contains('alarm')) {
			this.form.classList.add('alarm');
		}
	}
	
	saveBtnHandler() {

		const storedBook = {};
		storedBook.id = this.bookId;
		storedBook.img = this.form["img"].value;
		
		const title = this.form["title"].value;
		if (!isValidTitle(title)) {
			this.sayAlarm();
			return;
		}
		storedBook.title = this.form["title"].value;
		
		const author = this.form["author"].value;
		if (!isValidAuthor(author)) {
			this.sayAlarm();
			return;
		}
		storedBook.author = this.form["author"].value;
		const year = parseInt(this.form["year"].value);
		if (!isValidYear(year)) {
			this.sayAlarm();
			return;
		}
		storedBook.year = year;
		const saveEvt = new CustomEvent('save', {
			detail: storedBook,
			bubbles: true
		});
		this.form.dispatchEvent(saveEvt);
		this.hide();
	}
	
	display(book={
			img: '',
			title: '',
			author: '',
			year: '',
			id: null
		}
	) {
		this.form.classList.remove('hidden');
		
		const img = this.form.elements["img"];
		img.value = book.img;
		
		const title = this.form.elements["title"];
		title.value = book.title;
		
		const author = this.form.elements["author"];
		author.value = book.author;
		
		const year = this.form.elements["year"];
		year.value = book.year;
		
		this.bookId = book.id;
		
	}
	
	hide() {
		this.bookId = null;
		this.form.classList.add('hidden');
	}
	
	onInput() {
		if (this.form.classList.contains('alarm')) {
			this.form.classList.remove('alarm');
		}
	}
	
}


