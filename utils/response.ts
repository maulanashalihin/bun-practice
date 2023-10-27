
const default_headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
}

const cache_view = new Map();

class response {
    
    send(data: string, res_headers = {}) {

        let function_headers = {
            'Content-Type': 'text/plain',
        }

        let headers = {
            ...default_headers,
            ...function_headers,
            ...res_headers,

        }
        return new Response(data, {
            headers: headers
        })
    }

    error(data: string, code = 400, res_headers = {}) {

        let function_headers = {
            'Content-Type': 'text/plain',
        }

        let headers = {
            ...default_headers,
            ...function_headers,
            ...res_headers,

        }
        return new Response(data, {
            status: code,
            headers: headers
        })
    }

    json(data: object, res_headers = {}) {

        let function_headers = {
            'Content-Type': 'application/json',
        }

        let headers = {
            ...default_headers,
            ...function_headers,
            ...res_headers,

        }
        return new Response(JSON.stringify(data), {
            headers: headers
        })
    }

    redirect(url: string, status = 302, res_headers = {}) {

        let function_headers = {
            'Location': url
        }

        let headers = {
            ...default_headers,
            ...function_headers,
            ...res_headers,

        }
        return new Response(null, {
            status: status,
            headers: headers
        })
    }

    html(data: string, res_headers = {}) {

        let function_headers = {
            'Content-Type': 'text/html',
        }

        let headers = {
            ...default_headers,
            ...function_headers,
            ...res_headers,

        }
        return new Response(data, {
            headers: headers
        })
    }


    async view(file: string, res_headers = {}) {

        let function_headers = {
            'Content-Type': 'text/html',
        }

        if (process.env.CACHE_VIEW == "true") {


            var html_string = cache_view.get(file);


            if (!html_string) {

                cache_view.set(file, await Bun.file(file).text());

                html_string = cache_view.get(file);
            }
        } else {
            html_string = await Bun.file(file).text();
        }

        if (process.env.HOT_RELOAD == "true") {

            html_string.replace(
                "</body>",
                `
             <script>
             var evtSource = new EventSource('http://localhost:8005/subscribe');
       
                evtSource.onmessage = function (event) { 
                if (event.data.includes("reload")) {
                   console.log("reloaded")
                   location.reload()
                }
             };
             </script>
             </body>
             `)
        }



        let headers = {
            ...default_headers,
            ...function_headers,
            ...res_headers,

        }
        return new Response(html_string, {
            headers: headers
        })
    }
}

export default new response()