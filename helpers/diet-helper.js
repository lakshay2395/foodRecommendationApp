var bmiCalculator = require("./bmi-helper");

var activityTypeQuotients = require("../const/activityTypeQuotients");

/**
 * Calculates ideal kCal requirement per day based on users' height, weight , age and gender.
 * @param {*} user 
 */
var calculateIdealKiloCalorieRequirementPerDay = function(user){
    var height = user["bmi_paramters"].height;
    var age = user.age;
    var idealWeight = calculateIdealWeight(user);
    switch(user.gender){
        case "Male" : return (66.67+(13.75*idealWeight)+(5*height)-6.76*age)*activityTypeQuotients[user.activityType];
        case "Female" : return (665.1+(9.56*idealWeight)+(1.85*cm)-(4.68*age))*activityTypeQuotients[user.activityType];
        default : throw "No Proper Gender Found !";
    }
}

/**
 * Calculates current kCal requirement per day based on users' height, weight , age and gender.
 * @param {*} user 
 */
var calculateCurrentKiloCalorieRequirementPerDay = function(user){
    var weight = user["bmi_paramters"].weight;
    var height = user["bmi_paramters"].height;
    var age = user.age;
    switch(user.gender){
        case "Male" : return (66.67+(13.75*weight)+(5*height)-6.76*age)*activityTypeQuotients[user.activityType];
        case "Female" : return (665.1+(9.56*weight)+(1.85*cm)-(4.68*age))*activityTypeQuotients[user.activityType];
        default : throw "No Proper Gender Found !";
    }
}

/**
 * Calculates ideal weight based users' bmi , age and gender.
 * @param {*} user 
 */
var calculateIdealWeight = function(user){
    var bmi = bmiCalculator.calculateBmi(user["bmi_paramters"].weight,user["bmi_paramters"].height);
    switch(user.gender){
        case "Male" : return (0.5*bmi+11.5)*height*height;
        case "Female" : return (0.4*bmi+0.03*age+11)*height*height;
        default : throw "No Proper Gender Found !"; 
    }
}



var container = {
    idealWeight : calculateIdealWeight,
    currentKiloCalorieRequirementPerDay : calculateCurrentKiloCalorieRequirementPerDay,
    idealKiloCalorieRequirementPerDay : calculateIdealKiloCalorieRequirementPerDay
}

module.exports = container;