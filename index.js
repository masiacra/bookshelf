//Зависимости






fetch('./data/books.json')
	.then(response => response.json())
	.then(data => {
		const booklist = new BookList(document.getElementsByClassName('bookList')[0]);
		const form = new CommonForm(document.forms[0]);
		const addBtn = new AddBtn(
			document.body.getElementsByClassName('button_add')[0],
			form.display.bind(form)
		);
		const app = new App(
			document.body, 
			data, 
			form.display.bind(form),
			booklist.addElem.bind(booklist),
			booklist.editElem.bind(booklist)
		);
		booklist.render(data);
	});
