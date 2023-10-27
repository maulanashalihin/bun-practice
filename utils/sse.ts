import { Context } from "@stricjs/router";

interface ClientType {
    controller: ReadableStreamController<any>;
    room?: string;
    id?: string;
}

export let clients = [] as ClientType[];

export default function (request: Context<any, any>) {
    const signal = request.signal;

    const stream = new ReadableStream({
        async start(controller) {

            controller.enqueue(`data: initialize\n\n`);

            clients.push({ controller });

            while (!signal.aborted) {
                await Bun.sleep(1000);
            }
            clients = clients.filter((client) => client.controller != controller);
            controller.close();


        }
    });

    return new Response(stream, {
        status: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "text/event-stream;charset=utf-8",
            "Cache-Control": "no-cache, no-transform",
            Connection: "keep-alive",
            "X-Accel-Buffering": "no",
        },
    });
}