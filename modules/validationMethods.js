//Методы валидации рзличной информации

//Вспомогательная функция для всегда валидного значения
function alwaysValid() {
	return true;
}
		
//Валидация автора
function isValidAuthor(author) {
	if (typeof(author) !== 'string') {
		console.error('Переданная информация по автору не ' +
			'является строковым значением');
		return false;
	} else if (author.trim().length === 0){
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
	} else if (title.trim().length === 0) {
		return false;
	} else {
		return true;
	}
}
		
//Валидация года издания
function isValidYear(year) {
	if (typeof(year) === 'number' && year <= 2017) {
		return true;
	} else {
		console.error('Неккорректная информация по году ' +
			'издания книги');
		return false;
	}
}
	
