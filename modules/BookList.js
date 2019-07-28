//Список книг
class BookList {
	
	constructor(ul) {
		this.ul = ul;
		this.ul.onclick = this.clickHandler.bind(this);
		this.editElem = this.editElem.bind(this);
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
		const parent = target.parentNode.parentNode;
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
		
		const parent = target.parentNode.parentNode;
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
		
		const div1 = img.nextElementSibling;
		const title = div1.firstElementChild;
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
		
		//Для верстки необходимо обернуть абзацы в элемент div
		const div1 = document.createElement('div');
		
		const title = createElement('p', 'textContent', 
		  obj.title, 'bookList__title')(isValidTitle);
		div1.appendChild(title);
		
		const author = createElement('p', 'textContent', 
		  obj.author)(isValidAuthor);
		div1.appendChild(author);
		
		
		
		const year = createElement('p', 'textContent', 
		  obj.year)(isValidYear);
		div1.appendChild(year);
		
		li.appendChild(div1);
		
		const div2 = document.createElement('div');
		
		const delButton = createElement('button', 'textContent', 
			'Редактировать', 'bookList__edit_btn btn')(alwaysValid);
		div2.appendChild(delButton);
		const editButton = createElement('button', 'textContent', 
			'Удалить', 'bookList__delete_btn btn')(alwaysValid);
		div2.appendChild(editButton);
		
		li.appendChild(div2);
		
		return li;
	}
	
	addElem(book) {
		const li = this.factory(book);
		this.ul.appendChild(li);
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

