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
