
function search(){
    var searchText = $("input")[0].value.toLocaleLowerCase();
    if(searchText != ""){
        location.href = location.pathname + "?" + searchText;
    }
}

function searchFromURL(){
    var urlMatch = /\?(.+)/.exec(location.href); 
    if(urlMatch == null){
        return;
    }
    else {
        var keywords = decodeURI(urlMatch[1]).split(" ");
        if(keywords.length == 1 && keywords[0] == ""){
            return;
        }
        else {
            parseSearchKeywords(keywords).then(function(data){
                $("#events").empty();
                addSearchEvents(data);
            }, function(error){
                console.log("Error");
                console.log(error);
            });
        }
    }
}

searchFromURL();
function parseSearchKeywords(keywords){
    var queries = [];
    for(key in keywords){
        var query = new Parse.Query(Event);
        query.equalTo("keywords", keywords[key]);
        queries.push(query);
    }
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

function addSearchEvents(events){
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
