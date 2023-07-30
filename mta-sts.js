let kuragg_content = [
  "version: STSv1",
  "mode: enforce",
  "mx: mx1.smtp.goog",
  "mx: mx2.smtp.goog",
  "mx: mx3.smtp.goog",
  "mx: mx4.smtp.goog",
  "max_age: 604800",
  ""
].join("\n")

let aliaskuraxyz_content = [
  "version: STSv1",
  "mode: enforce",
  "mx: inbound-smtp.eu-west-1.amazonaws.com",
  "max_age: 604800",
  ""
].join("\n")

async function handle_req(request) {
  let url = new URL(request.url)
  if (url.pathname == "/.well-known/mta-sts.txt") {
    if (url.host == "mta-sts.aliaskura.xyz") {
      return new Response(aliaskuraxyz_content, {
        headers: {
          "Content-Type": "text/plain; charset=UTF-8",
          "X-Clacks-Overhead": "GNU Terry Pratchett"
        }
      })
    } else {
      return new Response(kuragg_content, {
        headers: {
          "Content-Type": "text/plain; charset=UTF-8",
          "X-Clacks-Overhead": "GNU Terry Pratchett"
        }
      })
    }
  } else {
    return new Response("", {
      status: 404
    })
  }
}

addEventListener("fetch", async event => {
  event.respondWith(handle_req(event.request))
})
