// var numPhoto = 5;

// var width = 100/numPhoto;

// document.getElementsByClassName("images").style."display"="none";
// alert("event.js launched!");
Parse.initialize("8isJgtutQ8AdDqryHScLFn4ETPn8HFiUTnBDkqgY", "XXZ4qiRU2jgygeZbE95sHGDEC2H5uKMqqhU9THEx");

var photo = Parse.Object.extend("Photo"),
    Event = Parse.Object.extend("Event"),
    test = Parse.Object.extend("Photo");

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

        var eventID = /\?(\w+)/.exec(window.location.href)[1];
        var event = new Event();
        event.id = eventID;

        event.set("photoCount", data.length);
        event.save(null, {error : function(error){
            console.log("Error");
            console.log(error);
        }});

        // $(this).css("display","none"))

       
        $(".images").hover(function() { 
            var object = $(this);

            newPhoto = object.clone();

            newPhoto.css("width","400px");
            newPhoto.css("height","400px");
            newPhoto.css("z-index","100");
            newPhoto.css("padding-top","25px");
            newPhoto.css("margin-left","0 auto");
            newPhoto.css("margin-right","0 auto");
            newPhoto.attr("id","expanded");
            newPhoto.attr("onClick")
            $("#expanded").remove();
            $(".row").append(newPhoto);
            $("#expanded").click(function(){ $("#expanded").remove(); });


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
            //$("#expanded").remove();
            }


        );

        if($(".row").height() > 150){

            $(".row").css();

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
        fullPhoto = photo.get("image").url(),
        thumbnailURL = fullPhoto;
        //thumbnailURL = photo.get("thumbnail").url();

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

    if(images.width() > 200){
        images.css("width","200px");
        images.css("height","200px");
    }
    if(images.width() < 25){
        images.css("width","25px");
        images.css("height","25px");
    }
    return template;
}

$("#addPhoto").click(function(){slideMenuDown()});
$("#hidePhoto").click(function(){slideMenuUp()});
$("#submitBtn").click(function(){submitPhoto()});
// $("#enterName").keyup(function(event){
//     if(event.keyCode == 13){
//         $("#submitBtn").click();
//     }
// });
// $("#enterDesc").keyup(function(event){
//     if(event.keyCode == 13){
//         $("#submitBtn").click();
//     }
// });

function slideMenuDown(){
    var menu = $("#photoMenu");
    menu.css("display","block");
    menu.animate({height:"225px"},"slow");
}
function slideMenuUp(){
    var menu = $("#photoMenu");
    menu.animate({height:"0px"},"slow");
    menu.promise().done(function(){ menu.css("display","none");});
}

function submitPhoto(){
    var name = $("#enterName").val();
    var desc = $("#enterDesc").val();
    // var fileUploadControl = $("#uploadPhoto")[0];

    // if (fileUploadControl.files.length > 0) {
    //   var file = fileUploadControl.files[0];
    //   var filename = "photo.jpg";
     
    //   var parseFile = new Parse.File(filename, file);
    // }
    // console(parseFile);

    if(name != ""){
        console.log("yes");
        var photo = new test();
        var eventID = /\?(\w+)/.exec(window.location.href)[1];
        
        photo.set("event", eventID);
        photo.set("title", name);
        // photo.set("image", parseFile);
        if(desc != ""){
            photo.set("desc", desc);
        }
        photo.save(null, {error: function(error){
                console.log("Error");
                console.log(error);
        }});
    
        slideMenuUp();
        // location.reload();
    }
}