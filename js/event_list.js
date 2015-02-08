var Event = Parse.Object.extend("Event"),
    Photo = Parse.Object.extend("Photo"),
    User = Parse.Object.extend("User");

function createListItem(eventID, name, thumbnailURL, desc, photoCount, owner){
    var template = $("#template").clone();
    template.removeAttr("id");
    template.find(".media-object").attr("src", thumbnailURL);
    template.find(".media-heading").innerHTML=name;
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
    query.find({
        success: function(result){
            
        });
}
