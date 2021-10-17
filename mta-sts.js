let content = [
  "version: STSv1",
  "mode: testing",
  "mx: mx1.smtp.goog",
  "mx: mx2.smtp.goog",
  "mx: mx3.smtp.goog",
  "mx: mx4.smtp.goog",
  "max_age: 604800",
  ""
].join("\n")

async function handle_req(request) {
  let url = new URL(request.url)
  if (url.pathname == "/.well-known/mta-sts.txt") {
    return new Response(content, {
      headers: {
        "Content-Type": "text/plain; charset=UTF-8",
      }
    })
  } else {
    return new Response("", {
      status: 404
    })
  }
}

addEventListener("fetch", async event => {
  event.respondWith(handle_req(event.request))
})
