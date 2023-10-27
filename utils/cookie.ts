import { Context } from "@stricjs/router";

const config = {
    "secure": true,
    "httpOnly": true,
    "sameSite": "None", // None || Lax || Strict  
    "maxAge": 60 * 60 * 24 * 30 // 30 days
}

// create Set-Cookie from config above


export default function (ctx: Context<any, any>) {
    return {
        get: (name: string) => {

            const has_cookie = ctx.headers.get("cookie");

            if (has_cookie) {
                const cookies = has_cookie.split('; ');

                for (const cookie of cookies) {
                    if (cookie.includes(name)) {
                        return cookie.split("=")[1];
                    }
                }
            } else {
                return null;
            }


        },
        set: (name: string, value: string) => {
            return {
                "Set-Cookie": `${name}=${value};Path=/;${config.secure ? "Secure" : ""};Max-Age=${config.maxAge};SameSite=${config.sameSite};${config.httpOnly ? "HttpOnly;" : ""}`
            }
        },
        remove: (name: string) => {
            return {
                "Set-Cookie": `${name}=; Secure;Path=/; Max-Age=0`
            }
        }
    }
}