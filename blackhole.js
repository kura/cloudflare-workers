class ElementHandler {
  element(element) {
    element.append('<base href="https://kura.gg/blackhole/" />', {html: true})
  }
}

let remove_headers = [
  "age",
  "expires",
  "via",
  "x-cache",
  "x-cache-hits",
  "x-fastly-request-id",
  "x-frame-options",
  "x-github-request-id",
  "x-proxy-cache",
  "x-served-by",
  "x-timer"
]

async function handle_req(request) {
  let old_url = new URL(request.url)
  if (old_url == "https://kura.gg/blackhole" || old_url == "https://kura.gg/blackhole/") {
    return Response.redirect("https://kura.gg/blackhole/index.html", 301)
  } else {
    let new_url = old_url.toString().replace(
      "https://kura.gg/blackhole",
      "https://kura.github.io/blackhole"
    )

    let res = await fetch(new_url)
    let content_type = res.headers.get("Content-Type")

    let new_headers = new Headers(res.headers)
    new_headers.set("Access-Control-Allow-Headers", "Origin,Range,Accept-Encoding,Referer")
    new_headers.set("Access-Control-Expose-Headers", "Server,Range,Date,Content-Length,Content-Range,Content-Location,Location")
    new_headers.set("Access-Control-Allow-Methods", "GET,HEAD")
    new_headers.set("Access-Control-Allow-Origin", "https://kura.gg")
    new_headers.set("Access-Control-Max-Age", "86400")
    new_headers.set("X-Frame-Options", "DENY")
    new_headers.set("X-Content-Type-Options", "nosniff")
    new_headers.set("X-Xss-Protection", "1; mode=block")
    new_headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
    new_headers.set("Permissions-Policy", "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=(), interest-cohort=()")
    new_headers.set("Content-Security-Policy", "default-src 'self'; script-src 'self' a.disquscdn.com disqus.com syslogtv.disqus.com gist.github.com; style-src 'self' assets-cdn.github.com netdna.bootstrapcdn.com a.disquscdn.com; img-src 'self' referrer.disqus.com a.disquscdn.com img.shields.io; font-src 'self' data: netdna.bootstrapcdn.com; connect-src 'none'; media-src 'self'; object-src 'self' player.vimeo.com; child-src www.youtube.com player.vimeo.com disqus.com; frame-ancestors 'none'; form-action 'none'; upgrade-insecure-requests; base-uri https://kura.gg; manifest-src 'none';")
    new_headers.set("X-Clacks-Overhead", "GNU Terry Pratchett")

    remove_headers.forEach(function(name){
      new_headers.delete(name)
    })

    // This causes the worker to error, not sure why
    // if (content_type.startsWith("text/html")) {
        // let new_res = new HTMLRewriter().on("head", new ElementHandler()).transform(res)
    // }

    return new Response(res.body, {
      status: res.status,
      statusText: res.statusText,
      headers: new_headers
    })
  }
}

addEventListener("fetch", async event => {
  event.respondWith(handle_req(event.request))
})
