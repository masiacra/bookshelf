class AddBtn {
	constructor(btn, cb) {
		this.btn = btn;
		this.cb = cb;
		this.btn.onclick = this.onClick.bind(this);
	}
	
	onClick() {
		this.cb();
	}
	
}
