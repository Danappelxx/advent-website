var Event = Parse.Object.extend("Event"),
    Photo = Parse.Object.extend("Photo"),
    User = Parse.Object.extend("User");

function createListItem(eventID, name, thumbnailURL, desc, photoCount, owner){
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

    //TODO: add thumbnail url and owner
    var listItem = createListItem(eventID, name, "", desc, photoCount, "");
    $(".container").append(listItem);
}
