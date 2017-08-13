import hero from '../templates/hero.handlebars'
import data from '../data/dummy.json'

const app = document.getElementById('app')
app.innerHTML = hero(data)
