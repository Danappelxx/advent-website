// var numPhoto = 5;

// var width = 100/numPhoto;

// document.getElementsByClassName("images").style."display"="none";
// alert("event.js launched!");
Parse.initialize("8isJgtutQ8AdDqryHScLFn4ETPn8HFiUTnBDkqgY", "XXZ4qiRU2jgygeZbE95sHGDEC2H5uKMqqhU9THEx");

var photo = Parse.Object.extend("Photo"),
    Event = Parse.Object.extend("Event");

updateEventNames();
addPhotos(0,0);

function updateEventNames(){
    var eventID = /\?(\w+)/.exec(window.location.href)[1];
    var query = new Parse.Query(Event);
    query.get(eventID).then(function(data){
        var name = data.get("name"),
            desc = data.get("desc");
        $(".page-header h1").text(name);
        $(".lead").text(desc);
        $("title").text(name);
    }, function(error){
        console.log("Error");
        console.log(error);
    });
}

function getRecentPhotos(photoCount, skipCount){
    var eventID = /\?(\w+)/.exec(window.location.href)[1];
    var event = new Event();
    event.id = eventID;
    var query = new Parse.Query(photo);
    query.include("event");
    query.equalTo("event",event);
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
            addPhotoToList(data[i], data.length);
        }
        $("#tempImage").css("display","none");
        
        $(".images").hover(function() { 
            var object = $(this);

            newPhoto = object.clone();

            newPhoto.css("width","600px");
            newPhoto.css("height","600px");
            newPhoto.css("z-index","100");
            newPhoto.css("padding-top","25px");
            newPhoto.attr("id","expanded");
            $(".row").append(newPhoto);
            
        }, function() {
            var object = $(this);
            //object.css("display","none");
            var full = object.attr('full');
            var thumbnail = object.attr('src');
            object.attr('full', thumbnail);
            object.attr('src', full);
            object.css("z-index","1");
            //object.css("width","200px");
            //object.css("height","200px");
            $("#expanded").remove();
            }
        );

        if($(".row").height() > 150){

            alert("hi");

        }

    }, function(error){
        console.log("Error");
        console.log(error);
    });
}

function addPhotoToList(photo, photoCount){
    var photoID = photo.id,
        name = photo.get("name"),
        desc = photo.get("desc"),
        numPhotos = photoCount,
        //photoCount = photo.get("photoCount");
        fullPhoto = photo.get("image").url();
        thumbnailURL = fullPhoto;

    //TODO: add thumbnail url and owner
    var photo = createPhotos(photoID, name, thumbnailURL, desc, numPhotos, fullPhoto);
    $(".rowContained").append(photo);
}

function createPhotos(photoID, name, thumbnailURL, desc, photoCount, fullPhoto){

    var rowWidth = $( document ).width();
    
    rowWidth = rowWidth - 200;

    var width = rowWidth/photoCount;
    
    width = width + "px";
    
    var template = $("#tempImage").clone();

    template.removeAttr("id");

    var images = template.find(".images");

    images.attr("src", thumbnailURL); 
    images.attr("full",fullPhoto);
    images.attr("id", photoID);
    images.css("width",width);
    images.css("height",width);
    images.css("min-width","25px");
    images.css("min-height","25px");
    images.css("max-width","300px");
    images.css("max-height","300px");

    return template;
}
