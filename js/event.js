// var numPhoto = 5;

// var width = 100/numPhoto;

// document.getElementsByClassName("images").style."display"="none";
// alert("event.js launched!");
Parse.initialize("8isJgtutQ8AdDqryHScLFn4ETPn8HFiUTnBDkqgY", "XXZ4qiRU2jgygeZbE95sHGDEC2H5uKMqqhU9THEx");

alert("0");
var photo = Parse.Object.extend("Photo");

addPhotos(0,0);

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