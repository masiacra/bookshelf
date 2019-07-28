//Зависимости


const booklist = new BookList(document.getElementsByClassName('bookList')[0]);
const form = new CommonForm(document.forms[0]);
const app = new App(document.body, form.display.bind(form));


app.render('./data/books.json', booklist.render.bind(booklist));

	
