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
	
	sayAlarm(word) {
		const alarm = this.form.getElementsByClassName('alarm')[0];
		if (alarm.classList.contains('invisible')) {
			alarm.textContent = word;
			alarm.classList.remove('invisible');		
		}
	}
	
	saveBtnHandler() {

		const storedBook = {};
		storedBook.id = this.bookId;
		storedBook.img = this.form["img"].value;
		
		const title = this.form["title"].value;
		if (!isValidTitle(title)) {
			this.sayAlarm('Некорректное название книги!');
			return;
		}
		storedBook.title = this.form["title"].value;
		
		const author = this.form["author"].value;
		if (!isValidAuthor(author)) {
			this.sayAlarm('Некорректное имя автора!');
			return;
		}
		storedBook.author = this.form["author"].value;
		const year = parseInt(this.form["year"].value);
		if (!isValidYear(year)) {
			this.sayAlarm('Некорректный год издания');
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
		this.form.parentNode.classList.remove('hidden');
		
		const img = this.form.elements["img"];
		img.value = book.img;
		
		const title = this.form.elements["title"];
		title.value = book.title;
		
		const author = this.form.elements["author"];
		author.value = book.author;
		
		const year = this.form.elements["year"];
		year.value = book.year;
		
		this.bookId = book.id;
		const h2 = this.form.getElementsByTagName('h2')[0];
		if (this.bookId) {
			h2.textContent = 'Редактирование книги';
		} else {
			h2.textContent = 'Добавление книги';
		}
		
	}
	
	hide() {
		this.bookId = null;
		const alarm = this.form.getElementsByClassName('alarm')[0];
		alarm.classList.add('invisible');
		this.form.parentNode.classList.add('hidden');
	}
	
	onInput() {
		const alarm = this.form.getElementsByClassName('alarm')[0];
		if (!alarm.classList.contains('invisible')) {
			alarm.classList.add('invisible');
		}
	}
	
}


