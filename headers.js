addEventListener('fetch', event => {
  event.respondWith(handle_equest(event.request))
})

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

async function handle_equest(request) {
  let response = await fetch(request)
  let new_headers = new Headers(response.headers)
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

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: new_headers
  })
}
