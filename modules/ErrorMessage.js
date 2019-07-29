class ErrorMessage {
	constructor(elem) {
		this.elem = elem;
	}
	render() {
		this.elem.classList.add('error');
		this.elem.innerHTML = '<p>Простите, какие то проблемы с данными.' +
		' Пожалуйста, свяжитесь с нашей службой поддержки!</p>';
	}
}
