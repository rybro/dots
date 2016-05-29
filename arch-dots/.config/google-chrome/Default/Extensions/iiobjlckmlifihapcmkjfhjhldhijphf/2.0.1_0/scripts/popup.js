if(window.location.toString().indexOf("soundcloud.com") > -1) {

  permahideList = [];
  permahideStored = [];
  soundShroudLogo = chrome.extension.getURL('images/soundshroud.png');
  soundShroudTwitter = chrome.extension.getURL('images/twitter.png');
  soundShroudFacebook = chrome.extension.getURL('images/facebook.png');
  //get list of hidden songs from Chrome storage area
  chrome.storage.sync.get('permahideStored', function(result) {
    permahideStored = result.permahideStored;
    if(permahideStored.length != 0) {
      permahideList = permahideStored;
    }
    console.log("Loaded " + permahideStored.length + " song(s) from permahide list");
  });

  //Sets variables to default to re-initialize functionality
  function resetBarStatus() {
    streamBar = false;
    removeReposts = false;
    repostsShown = false;
    repostsInit = false;
    loadedSize = 0;
    permahideMode = false;
    songsToSkip = [];
    songsToSkip.push(permahideList)
  }
  resetBarStatus();

  var permahideTooltip = "<div class='permahide-tooltip'>Click on any sound to \n add to your hidden list</div>"

  //Check the URL of SC page to determine appropriate function bar
  function checkSCPage() {
    if(window.location.toString().indexOf("/stream") > -1) {
      addStreamBar()
      mainStream = $(".stream");
    }
    else {
      $(".soundshroud-bar").remove();
      $(".permahide-tooltip").remove();
      $("#soundshroud-toggle").remove();
      resetBarStatus();
    }
  }

  //checks every 3 seconds if the URL has changed
  setInterval(function() {
    checkSCPage()
  }, 3000);

  //checks every 3 seconds if reposts need to be removed
  setInterval(function() {
    checkStreamSize()
  }, 3000)

  //Adds the Stream Bar for removing reposts, etc.
  function addStreamBar() {
    if(window.streamBar == false) {
      resetBarStatus();
      $("header").append("<div class='soundshroud-bar'><h2 id='soundshroud'>SoundShroud v2</h2> &nbsp;<a href='https://twitter.com/soundshroudme'><img src='" + soundShroudTwitter + "'></a>&nbsp;<a href='https://www.facebook.com/SoundShroud-1510563025913493/'><img src='" + soundShroudFacebook + "'></a>" + "<div class='soundshroud-functions'>" +
        "<label>Remove Reposts: <input type='checkbox' class='ios-switch' id='remove-reposts'><div class='switch'></div></label>" + 
        "<label>Perma-Hide: <input type='checkbox' class='ios-switch' id='permahide'><div class='switch'></div></label>" +
        // "<label><input type='checkbox' class='ios-switch' id='filter-comments'><div class='switch'></div>Filter Comments</label>" +
        "</div><button id='reset-permahide'>Reset Permahide List</button><div class='right-side'>Created by <a href='https://soundcloud.com/the3rc'>[3RC]</a></div></div>" +
        "<img id='soundshroud-toggle' src='" + soundShroudLogo + "'>");
      $("#remove-reposts").click(function() {
        if(removeReposts == false && repostsShown == false) {
          removeReposts = true
          $(".lazyLoadingList__list").prepend("<h3 class='if-not-loading'>Reposts are being filtered. <br>If tracks stop loading, scroll up a little and then back down. <br>If all else fails, refresh and try again.</h3>")
          killReposts(mainStream)
          console.log("Remove reposts active")
        }
        else {
          removeReposts = false
          $(".if-not-loading").remove()
          console.log("Remove reposts inactive")
        }
      });
      $("#permahide").click(function() {
        togglePermahide()
      });
      $("#reset-permahide").click(function() {
        chrome.storage.sync.clear()
        permahideList = [];
      })
      window.streamBar = true;
      window.removeReposts = false;
      $(".soundshroud-bar").hide();
      $("#soundshroud-toggle").click(function() {
        $(".soundshroud-bar").toggle();
      })
    }
    killPermahide()
    removePromoted()
    $(".dashbox").hide()
  }

  //Checks number of sounds in the stream 
  function checkStreamSize() {
    var currentSize = $(".soundList__item").length
    if(currentSize !== loadedSize) {
      killPermahide(mainStream)
      if(permahideMode == true) {
        if(currentSize >= loadedSize) {
          $("#permahide").trigger("click")
        }
      }
      if(removeReposts == true) {
        killReposts(mainStream)
      }
      loadedSize = currentSize
    }
  }

  //Looks for promoted sounds or profiles and removes them from the DOM
  function removePromoted() {
      $(".sc-promoted-icon").closest("li").remove()
  }

  //Removes selected hidden tracks from the stream
  function killPermahide() {
    for(i = 0; permahideList.length > i; i++) {
      $("a[href='" + permahideList[i] +"']").parent().parent().parent().parent().parent().remove()
    }
  }

  //Removes reposts from the stream
  function killReposts() {
    if(repostsInit == false) {
      $(".lazyLoadingList__list").append("<div class='stream-reposts hidden'></div>");
    }
    repostsInit = true;
    $(".stream-reposts").append($(".soundContext__repost").parent().parent().parent().parent().parent());

    var reposts = $(".stream-reposts").find(".soundTitle__title").each(function() {
      songsToSkip.push($(this).attr("href"))
    });
    songsToSkip = _.uniq(songsToSkip)

  }

  //Adds the selected track to local DB to be permanently ignored, and remote DB for stat counting.
  function togglePermahide() {
    if(permahideMode == true) {
      permahideMode = false
      $(".permahide-tooltip").remove()
      $(".soundList__item").removeClass("hide-overlay")
    }
    else {
      $(".soundList__item").click(function(e) {
        if(permahideMode == true) {
          var songUrl = $(this).find(".soundTitle__title").attr("href")
          console.log("Added to permahide list: " + songUrl)
          permahideList.push(songUrl)
          songsToSkip.push(songUrl)
          chrome.storage.sync.set({'permahideStored': permahideList}, function() {})
          e.preventDefault()
          $(this).remove()
        }
      })
      permahideMode = true
      $("body").append(permahideTooltip)
      $(".soundList__item").addClass("hide-overlay")
    }

  }

  //Checks the currently playing sound against the removed sounds
  setInterval(function() {
    var nowPlaying = $(".playbackSoundBadge").children().attr("href");
    if(nowPlaying != undefined) {
      songsToSkip = _.uniq(songsToSkip);
      for( i = 0; i < songsToSkip.length; i++ ) {
        if(songsToSkip[i].indexOf(nowPlaying) > -1) {
          $(".skipControl__next").trigger("click")
        }
      }
    }
  }, 800)

}
