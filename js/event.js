// var numPhoto = 5;

// var width = 100/numPhoto;

// document.getElementsByClassName("images").style."display"="none";
// alert("event.js launched!");
alert("0");
var Photo = Parse.Object.extend("Photo");


function getRecentPhotos(photoCount, skipCount){
    var query = new Parse.Query(photo);
    query.descending("createdAt");
    if(photoCount >= 1 && photoCount <= 1000){
        query.limit(photoCount);
    }
    if(skipCount >=1){
        query.skip(skipCount);
    }
    var promise = query.find();
    return promise;
}

function addPhotos(photoCount, skipCount){
    getRecentPhotos(photoCount, skipCount).then(function(data){
        for(var i = 0; i < data.length; i++){
            addPhotoToList(data[i]);
        }
    }, function(error){
        console.log("Error");
        console.log(error);
    });
}

function addPhotoToList(photo){
    var photoID = photo.get("objectID"),
        name = photo.get("name"),
        desc = photo.get("desc"),
        photoCount = photo.get("photoCount");

    //TODO: add thumbnail url and owner
    var photo = createPhotos(photoID, name, "", desc, photoCount, "");
    $(".row").append(photo);
}

    // var width = 100/photoCount;
    // alert("width: " + width);

function createPhotos(photoID, name, thumbnailURL, desc, photocount, owner){

    alert("1");
    var template = $("#tempImage").clone();

    template.removeAttr("id");

    template.find(".images").attr("src", thumbnailURL); 
    alert("2");
    return template;
}

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