import response from "../utils/response";

class Controller {

    json() {
        const data = { "name": "John", "age": 30, "city": "New York" };

        return response.json(data)
    }

    string() {
        return response.send("Hello World")
    }
    

}

export default new Controller();