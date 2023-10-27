import { generateUUID } from "../utils/helper";
import response from "../utils/response";

class Controller {

    json() {
        const data = { "name": "John", "age": 30, "city": "New York" };

        return response.json(data)
    }

    string() {

        const id = generateUUID();

        return response.send("Hello World : "+id)
    }
    

}

export default new Controller();