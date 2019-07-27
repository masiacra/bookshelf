//Зависимости
const fs = require('fs');


//Функция для записи файлов в формате json
function getFile(filename, data) {
	if (!filename) throw new Error('Не передано имя файла');
	if (!data) throw new Error('Не передано данных для записи');
	const jsonedData = JSON.stringify(data);
	fs.writeFile(filename, jsonedData, err => {
		if (err) throw err;
		console.log('Запись прошла успешно');
	});
}


const booksData = [
	{
		id: 0,
		img: './data/imgs/perfect_code.png',
		author: 'С. Макконнел',
		title: 'Совершенный код',
		year: 2017
	},
	{
		id: 1,
		img: './data/imgs/eloquent_js.png',
		author: 'М. Хавербек',
		title: 'Выразительный JAVASCRIPT',
		year: 2015
	},
	{
		id: 2,
		img: './data/imgs/learning_python.jpg',
		author: 'Бэрри П.',
		title: 'Изучаем программирование на Python',
		year: 2017
	},
	{
		id: 3,
		img: './data/imgs/learning_js.jpg',
		author: 'Э. Фримен, Э. Робсон',
		title: 'Изучаем программирование на JavaScript',
		year: 2015
	},
	{
		id: 4,
		img: './data/imgs/learning_py.jpeg',
		author: 'Мэтиз Э.',
		title: 'Изучаем Python. Программирование игр, визуализация ' +
			'данных, веб-приложения',
		year: 2017
	},
	{
		id: 5,
		img: './data/imgs/Javascripttoprofessional.jpg',
		author: 'Закас Н.',
		title: 'JavaScript для профессиональных веб-разработчиков',
		year: 2014
	},
	{
		id: 6,
		img: './data/imgs/UnderstandingES6.jpg',
		author: 'N. Zakas',
		title: 'Understanding ECMAScript6',
		year: 2017
	},
	{
		id: 7,
		img: './data/imgs/newBigBook.jpg',
		author: 'Макфарланд Д.',
		title: 'Новая большая книга CSS',
		year: 2014
	}
];

getFile('books.json', booksData);
