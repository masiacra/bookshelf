//Список книг
class BookList {
	
	constructor(ul) {
		this.ul = ul;
		this.ul.onclick = this.clickHandler.bind(this);
	}
	
	
	clickHandler(evt) {
		const target = evt.target;
		if (target.tagName !== 'BUTTON') return;
		if (target.classList.contains('bookList__delete_btn')) {
			this.deleteBtnHandler(target);
		} else {
			this.editBtnHandler(target);
		}
	}
	
	
	deleteBtnHandler(target) {
		const parent = target.parentNode;
		const id = parseInt(parent.dataset.id);
		const deleteEvt = new CustomEvent('delete', {
			detail: { id },
			bubbles: true
		});
		this.ul.dispatchEvent(deleteEvt);
		this.ul.removeChild(parent);
		
	}
	
	editBtnHandler(target) {
		const editValues = {};
		
		const parent = target.parentNode;
		editValues.id = parseInt(parent.dataset.id);
		
		const editEvt = new CustomEvent('edit', {
			detail: editValues,
			bubbles: true
		});
		
		this.ul.dispatchEvent(editEvt);
		
	}
	
	editElem(book) {
		
		const editElement = this.ul.querySelector(`li:nth-child(${book.id+1})`);
		
		const img = editElement.firstElementChild;
		img.src = book.img;
		
		const title = img.nextElementSibling;
		title.textContent = book.title;
		
		const author = title.nextElementSibling;
		author.textContent = book.author;
		
		const year = author.nextElementSibling;
		year.textContent = book.year;
		
	}
	
	
	//Вспомогательный метод для создания элементов li с содержимым
	//на лету
	factory(obj) {
		
		//Каррированная функция создания отдельного элемента
		function createElement(tag, attribute, attributeValue, 
		  className='') {
			return (validFn) => {
				if (!validFn(attributeValue)) {
					attributeValue = '';
				}
				const elem = document.createElement(tag);
				elem.className = className;
				elem[attribute] = attributeValue;
				return elem;
			};
		}

		
		//Тело метода
		if (typeof(obj) !== 'object') {
			throw new Error('Переданные данные не являются объектом!');
		}
		const li = document.createElement('li');
		li.dataset.id = obj.id;
		
		const img = createElement('img', 'src', obj.img)(alwaysValid);
		li.appendChild(img);
		
		const author = createElement('p', 'textContent', 
		  obj.author)(isValidAuthor);
		li.appendChild(author);
		
		const title = createElement('p', 'textContent', 
		  obj.title)(isValidTitle);
		li.appendChild(title);
		
		const year = createElement('p', 'textContent', 
		  obj.year)(isValidYear);
		li.appendChild(year);
		
		const delButton = createElement('button', 'textContent', 
			'Редактировать')(alwaysValid);
		li.appendChild(delButton);
		const editButton = createElement('button', 'textContent', 
			'Удалить', 'bookList__delete_btn')(alwaysValid);
		li.appendChild(editButton);
		
		return li;
	}
	
	addBook(book) {
		const li = this.factory(book);
		this.ul.append(li);
	}
	
	//При передаче данных выводим содержимое на экран
	render(data) {
		if (!Array.isArray(data)) {
		  throw new Error('Переданные данные не являются массивом');
		} 
		if (data.length === 0) {
		  this.ul.textContent = 'К сожалению, в ' +
		    'настоящий момент Ваша книжная полка пуста';
		    return;
		}
		const fragment = document.createDocumentFragment();
		data.forEach( book => {
			const li = this.factory(book);
			fragment.appendChild(li);
		});
		this.ul.appendChild(fragment);
	}
	
}

