var bmiStatus = require("../const/bmi-status");



var container = {
    "calculateBmi" : function(weight,height){
        /**
         * weight must be in kg
         * height must be in m
         */
         var bmi = weight/(height*height);
         return bmi;    
    },

    "statusOnBmi" : function(bmi){
        if(bmi < 18.5)
            return bmiStatus.UNDERWEIGHT;
        else if(bmi >= 18.5 && bmi <= 24.9)
            return bmiStatus.NORMAL;
        else if(bmi >= 25 && bmi <= 29.9)
            return bmiStatus.OVERWEIGHT;
        else if(bmi >= 30)
            return bmiStatus.OBESE;
    }
}

module.exports = container;