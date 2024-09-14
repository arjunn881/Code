import { serve } from "bun";

serve({
  fetch(request) {
    const url = new url(request.url);

    if (url.pathname === "/") {
      return new Response("Hello Guys!", { status: 200 });
    } else if (url.pathname === "/extra") {
      return new Response(
        "Hellow Guys! Are you nasking for something extra??",
        { status: 200 }
      );
    } else {
      return new Response("404 not found", { status: 404 });
    }
  },

  port: 6000,
  hostname: "127.0.0.1",
});
