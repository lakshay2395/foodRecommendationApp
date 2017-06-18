var dietHelper = require("./diet-helper.js");

var foodItems = require("../const/foodItems");

var container = {

    "calculateFoodMetricsForUser" : function(user){
        if(!user)
            throw "No User Provided !";
        var idealOneTimeKcal = dietHelper.idealKiloCalorieRequirementPerDay(user)/3;
        var set = foodItems.map(function(obj){
                var kCal = parseFloat(obj["kCal"]);
                var multiple = Math.floor(idealOneTimeKcal/kCal);
                obj["kCal"] = multiple*kCal;
                obj["weight_in_grams"] = multiple*parseFloat(obj["weight_in_grams"]);
                var measure = obj["measure"].split(" ");
                measure[0] = parseInt(measure[0])*multiple;
                obj["measure"] = measure.join(" ");
                return obj;
            });
        return set;
    }

}

module.exports = container;