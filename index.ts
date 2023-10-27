import { Router } from '@stricjs/router';
import { error, json, redirect, send, view } from './utils/response'; 

const app = new Router({ port: 4000 });

app.get('/', (ctx) => {

    return send("Hello World")

})


app.get('/', (ctx) => {

    const data = { "name": "John", "age": 30, "city": "New York" };

    return json(data)

})

app.get('/redirect', (ctx) => {

    return redirect('https://google.com')

})

app.get('/errror', () => {

    return error('Bad Request', 404)

})


app.get('/html', () => {

    return view("views/index.html")

})



app.listen();
