var Event = Parse.Object.extend("Event"),
    Photo = Parse.Object.extend("Photo"),
    User = Parse.Object.extend("User");

addEvents(0,0);

function createListItem(eventID, name, thumbnailURL, desc, photoCount){
    var template = $("#template").clone();
    template.removeAttr("id");
    template.find(".media-object").attr("src", thumbnailURL);
    template.find(".media-heading").text(name);
    template.find("#desc").text(desc);
    var eventPageURL = "event.html?id=";
    template.find("a").attr("href", eventPageURL + eventID);
    template.removeAttr("style");
    return template;
}

function getRecentEvents(eventCount, skipCount){
    var query = new Parse.Query(Event);
    query.descending("createdAt");
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
            addEventToList(data[i]);
        }
    }, function(error){
        console.log("Error");
        console.log(error);
    });
}

function addEventToList(event){
    var eventID = event.get("objectID"),
        name = event.get("name"),
        desc = event.get("desc"),
        photoCount = event.get("photoCount");

    var thumbnailObject = event.get("thumbnail");
    getPhoto(thumbnailObject.id).then(function(data){
        var thumbnailURL = data.get("thumbnail").url();
        var listItem = createListItem(eventID, name, thumbnailURL, desc, photoCount);
        $(".container").append(listItem);
    }, function(error){
        console.log("Error");
        console.log(error);
    });
}

function getPhoto(id){
    var query = new Parse.Query(Photo);
    return query.get(id);
}
