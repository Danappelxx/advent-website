var Event = Parse.Object.extend("Event"),
    Photo = Parse.Object.extend("Photo"),
    User = Parse.Object.extend("User");


var urlMatch = /\?(.+)/.exec(location.href); 
if(urlMatch == null){
    addEvents(0,0);
}
else {
    var keywords = decodeURI(urlMatch[1]).split(" ");
    if(keywords.length == 1 && keywords[0] == ""){
        addEvents(0,0);
    }
    else {
        $("input")[0].value = keywords.join(" ");
    }
}

function createListItem(eventID, name, thumbnailURL, desc, photoCount, timeString, index){
    var template = $("#template").clone();
    template.attr("id", index);
    template.find(".media-object").attr("src", thumbnailURL);
    template.find(".media-heading").text(name);
    template.find("#desc").text(desc);
    template.find("#time").text(timeString);
    template.find("#picture-count").text(photoCount);
    var eventPageURL = "event.html?";
    template.find("a").attr("href", eventPageURL + eventID);
    template.removeAttr("style");
    return template;
}

function getRecentEvents(eventCount, skipCount){
    var query = new Parse.Query(Event);
    query.descending("updatedAt");
    if(eventCount >= 1 && eventCount <= 1000){
        query.limit(eventCount);
    }
    if(skipCount >=1){
        query.skip(skipCount);
    }
    var promise = query.find();
    return promise;
}

function addEvents(eventCount, skipCount){
    getRecentEvents(eventCount, skipCount).then(function(data){
        for(var i = 0; i < data.length; i++){
            addEventToList(data[i], i);
        }
    }, function(error){
        console.log("Error");
        console.log(error);
    });
}

function addEventToList(event, index){
    var eventID = event.id,
        name = event.get("name"),
        description = event.get("desc"),
        photoCount = event.get("photoCount"),
        time = "Updated " + moment(event.updatedAt).fromNow();

    // var keywords = description.split(" ");
    // event.set("keywords", keywords);

    var thumbnailObject = event.get("thumbnail");

    if(thumbnailObject == undefined){
        var thumbnailURL = "images/placeholder.jpg";
        var listItem = createListItem(eventID, name, thumbnailURL, description, photoCount, time, index);
        var currEvents = $("#events"); 
      //   var didInsert = false;
      //   for(var i = 0; i < currEvents.length; i++){
      //       if(parseInt(currEvents[i].class) > index){
      //           listItem.insertBefore(currEvents[i]);
      //           didInsert = true;
      //       }
      //   }
      //   if(!didInsert){
            currEvents.append(listItem);
            var children = currEvents.children("ul");
            children.sort(function(a,b){
                var x = parseInt(a.id),
                    y = parseInt(b.id);
            if(x < y){
                return -1;
            }
            else if (x > y){
                return 1;
            }
            });
            children.detach().appendTo(currEvents);
      //  }
    }else{
    getPhoto(thumbnailObject.id).then(function(data){
        var thumbnailURL = data.get("thumbnail").url();
        var listItem = createListItem(eventID, name, thumbnailURL, description, photoCount, time, index);
        var currEvents = $("#events"); 
      //   var didInsert = false;
      //   for(var i = 0; i < currEvents.length; i++){
      //       if(parseInt(currEvents[i].class) > index){
      //           listItem.insertBefore(currEvents[i]);
      //           didInsert = true;
      //       }
      //   }
      //   if(!didInsert){
            currEvents.append(listItem);
            var children = currEvents.children("ul");
            children.sort(function(a,b){
                var x = parseInt(a.id),
                    y = parseInt(b.id);
            if(x < y){
                return -1;
            }
            else if (x > y){
                return 1;
            }
            });
            children.detach().appendTo(currEvents);
      //  }
    }, function(error){
        console.log("Error");
        console.log(error);
    });}
}

function getPhoto(id){
    var query = new Parse.Query(Photo);
    return query.get(id);
}