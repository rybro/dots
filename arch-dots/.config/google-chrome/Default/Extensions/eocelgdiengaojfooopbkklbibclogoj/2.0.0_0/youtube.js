(function() {
  var linkNodeList = document.getElementsByTagName('a')
    , links = Array.prototype.slice.call(linkNodeList, 0)
    , mainTextRegex  = /youtube\.com\/watch/
    , mainLinkRegex  = /youtube\.com\/watch\?.*v=([_a-zA-Z0-9\-]+)/
    , shortTextRegex = /youtu\.be/
    , shortLinkRegex = /youtu\.be\/([_a-zA-Z0-9\-]+)/

  function replaceLink(data) {
    var link = links[data.i]
      , title = data.title

    if (title) {
      link.innerHTML = "YouTube - " + title
    } else {
      link.innerHTML = "YouTube - Video no longer available"
      link.style.color = "red"
    }
  }

  function extractId(link) {
    var url = link.getAttribute('href')
      , text = link.innerText.replace(/\s/g, '')

    if (url && (text.match(mainTextRegex) && url.match(mainLinkRegex) ||
                text.match(shortTextRegex) && url.match(shortLinkRegex)))
      return RegExp.$1
  }

  for (var i = 0; i < links.length; i++) {
    var link = links[i]
      , ytId = extractId(link)

    if (ytId) {
      chrome.extension.sendMessage({
        action: "fetchYouTubeInfo", id: ytId, i: i
      }, replaceLink)
    }
  }
})()
