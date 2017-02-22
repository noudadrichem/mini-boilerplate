// Arrow functions !!
const hello = name => 'hello ' + name
console.log(hello('world'))

// JSON !!
import data from '../data/dummy.json'

// template literals !!
const headerContent = `<div class="header-content">
			<div class="inner-content">
				<div class="header-img">
					<img src="${data.img}" alt="yolo">
				</div>
				<h1>${data.name}</h1>
				<p>${data.header}</p>
			</div>
		</div>`

document.getElementById('header').innerHTML = headerContent
