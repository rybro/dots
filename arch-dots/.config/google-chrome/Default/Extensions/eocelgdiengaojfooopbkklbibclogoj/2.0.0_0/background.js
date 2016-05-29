function fetchYouTubeInfo(id, i, sendResponse) {
  var xhr = new XMLHttpRequest()

  xhr.onreadystatechange = function() {
    var parsedResponse, title

    if (xhr.readyState === 4) {
      try {
        if (xhr.status === 200) {
          parsedResponse = JSON.parse(xhr.responseText)
          title = parsedResponse.items[0].snippet.title
          sendResponse({ i: i, title: title })
          return
        }
      } catch(_) { }

      sendResponse({ i: i, title: null })
    }
  }

  var apiKey = "AIzaSyDpJPx4_lyh6cVU1Ui1HGFeBq45RCwXLy4"
  var url = "https://www.googleapis.com/youtube/v3/videos?id=" + id +
    "&key=" + apiKey + "&part=snippet&fields=items/snippet/title"

  xhr.open("GET", url, true)
  xhr.send()
}

function onMessage(request, sender, sendResponse) {
  if (request.action === "fetchYouTubeInfo") {
    fetchYouTubeInfo(request.id, request.i, sendResponse)
    return true
  }
}

chrome.extension.onMessage.addListener(onMessage)
