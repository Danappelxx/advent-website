alert("1");
var Photo = Parse.Object.extend("Photo");
var query = new Parse.Query(Photo);
query.get("eUMh1U5WXZ", {
  success: function(Photo) 
    alert("hello world!");
    // The object was retrieved successfully.
    // do something with it
  },
  error: function(object, error) {
    // The object was not retrieved successfully.
    // warn the user
  }
});
