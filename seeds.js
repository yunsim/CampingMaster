var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
        {name: "Salmon Creek", 
        image: "https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg", 
        description: "Located in southwestern Clark County and is bordered to the northeast by Mount Vista."}, 
        {name: "Granite Hill", 
        image: "https://farm9.staticflickr.com/8577/16263386718_c019b13f77.jpg", 
        description: "This is a huge granite hill, no bathroom, no water, beautiful views"},
        {name: "Mountain Si", 
        image:"https://farm9.staticflickr.com/8673/15989950903_8185ed97c3.jpg", 
        description: "An attractive mountain for hiking in eastern Seattle"}
        ]

function seedDB() {
    // Remove all campgrounds
    Campground.remove({}, function(err) {
        if (err) {
            console.log(err);
        }
        console.log("removed campgrounds");
        // Add a few campgrounds
        data.forEach(function(seed) {
            Campground.create(seed, function(err, campground) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("added a campground");
                    // create a comment
                    Comment.create(
                        {
                            text: "This place is great but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment) {
                            if (err) {
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("created new comment");
                            }
                                
                        }
                    );
                }
            });
        });
    });
}

module.exports = seedDB;