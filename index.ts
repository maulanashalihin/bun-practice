import { Router } from '@stricjs/router';  
import SampleController from './controllers/SampleController';

const app = new Router({ port: 4000 });

app.get("/",SampleController.string)

app.get('/json',SampleController.json)
 

app.listen();
