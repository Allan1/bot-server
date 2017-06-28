var system = require('system');
var page = require('webpage').create();

page.open(system.args[1], function (status) {
  // console.log(page.content);
  // phantom.exit();

  if (status !== "success") {
      console.log("Unable to access network");
  } else {
      // Wait for 'signin-dropdown' to be visible
    waitFor(function() {
        // Check in the page if a specific element is now visible
        return page.evaluate(function() {
            return document.getElementById('phantomFlag');
        });
    }, function() {
       console.log("The sign-in dialog should be visible now.");
       phantom.exit();
    });
  }
  // page.waitForSelector('#phantomFlag', function () {
  // 	console.log('waitForSelector')
  //   var pageContent = null;
  //   page.evaluate(function () {
  //     return document.getElementsByTagName('html')[0].innerHTML;
  //   }, function(ret){
  //     pageContent = ret;
  //     res.send(pageContent);
  //     res.end();
  //   });
  // });
})

function waitFor(testFx, onReady, timeOutMillis) {
    var maxtimeOutMillis = timeOutMillis ? timeOutMillis : 3000, //< Default Max Timout is 3s
        start = new Date().getTime(),
        condition = false,
        interval = setInterval(function() {
            if ( (new Date().getTime() - start < maxtimeOutMillis) && !condition ) {
                // If not time-out yet and condition not yet fulfilled
                condition = (typeof(testFx) === "string" ? eval(testFx) : testFx()); //< defensive code
            } else {
                if(!condition) {
                    // If condition still not fulfilled (timeout but condition is 'false')
                    console.log("'waitFor()' timeout");
                    phantom.exit(1);
                } else {
                    // Condition fulfilled (timeout and/or condition is 'true')
                    console.log("'waitFor()' finished in " + (new Date().getTime() - start) + "ms.");
                    typeof(onReady) === "string" ? eval(onReady) : onReady(); //< Do what it's supposed to do once the condition is fulfilled
                    clearInterval(interval); //< Stop this interval
                }
            }
        }, 250); //< repeat check every 250ms
};