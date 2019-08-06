window.onload = function () {
	console.log("client side javascript file is loaded!")

	

	const weatherForm = document.querySelector('form');
	const search = document.querySelector('input');
	const p1 = document.querySelector('#message1');
	const p2 = document.querySelector('#message2');

	weatherForm.addEventListener("submit", (e) => {
		e.preventDefault();

		const location = search.value;
		p1.textContent = "";
		p2.textContent = "";

		fetch(`/weather?address=${location}`).then((response) => {
		response.json().then((data) => {
			if(data.Error) {
				p1.textContent = data.Error;
			} else {
				p1.textContent = data.location;
				p2.textContent = `${ data.forecast.summary } 
								  Current temperature is ${data.forecast.currently}`;
			}
			// console.log(data);
		})
	})
	})
}

