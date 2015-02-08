function search(){
    var keywords = $("input")[0].value.toLocaleLowerCase().split(" ");
    parseSearchKeywords(keywords).then(function(data){
        $("#events").children("ul").hide();
        addEvents(data);
    }, function(error){
        console.log("Error");
        console.log(error);
    });
}

function parseSearchKeywords(keywords){
    var queries = [];
    for(key in keywords){
        var query = new Parse.Query(Event);
        query.equalTo("keywords", keywords[key]);
        queries.push(query);
    }
    console.log(x=queries)
    var mainQuery = Parse.Query.or.apply(null, queries);
    return mainQuery.find();
}

function sortEvents(events){
    events.sort(function(a,b){
        var x = moment(a.updatedAt),
            y = moment(b.updatedAt);
    
    if(x.isAfter(y)){
        return -1;
    }
    else if(y.isAfter(x)){
        return 1;
    }
    else {
        return 0;
    }
    });
}

function addEvents(events){
    sortEvents(events);
    for(var i = 0; i < events.length; i++){
        addEventToList(events[i], i);
    }
}

function checkKey(event){
    if(event.keyCode == 13){
        search();
    }
}
