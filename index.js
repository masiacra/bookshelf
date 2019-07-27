
class Bookshelf {
	
	constructor(ul) {
		this.ul = ul;
		this.factory = this.factory.bind(this);
		this.deleteBtnHandler = this.deleteBtnHandler.bind(this);
		this.ul.onclick = this.clickHandler.bind(this);
	}
	
	
	clickHandler(evt) {
		const target = evt.target;
		if (target.tagName !== 'BUTTON') return;
		if (target.classList.contains('bookshelf__delete_btn')) {
			this.deleteBtnHandler(target);
		}
	}
	
	
	deleteBtnHandler(target) {
		const parent = target.parentNode;
		this.ul.removeChild(parent);
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
		
		//Для того, чтобы непроверять некоторые значения создадим
		//следующую функцию
		function alwaysValid() {
			return true;
		}
		
		//Валидация автора
		function isValidAuthor(author) {
			if (typeof(author) !== 'string') {
				console.error('Переданная информация по автору не ' +
					'является строковым значением');
				return false;
			} else {
				return true;
			}
		}
		
		//Валидация названия книги
		function isValidTitle(title) {
			if (typeof(title) !== 'string') {
			  console.error('Переданная информация по названию книги' +
					' не является строковым значением');
			  return false;
			} else {
			  return true;
			}
		}
		
		//Валидация года издания
		function isValidYear(year) {
			if (typeof(year) === 'number' && obj.year <= 2017) {
				return true;
			} else {
				console.error('Неккорректная информация по году ' +
					'издания книги');
				return false;
			}
		}
		
		
		//Тело метода
		if (typeof(obj) !== 'object') {
			throw new Error('Переданные данные не являются объектом!');
		}
		const li = document.createElement('li');
		
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
			'Удалить', 'bookshelf__delete_btn')(alwaysValid);
		li.appendChild(editButton);
		
		return li;
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


const bookshelf = new Bookshelf(document.getElementsByClassName('bookshelf')[0]);


fetch('./data/books.json')
	.then(resp => resp.json())
	.then(data => bookshelf.render(data));

