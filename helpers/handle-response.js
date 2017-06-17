var container = {

    "error" : function(res,error){
            res.json({
                "status" : "error",
                "data" : error
            });
    },

    "success" : function(res,data){
        res.json({
            "status" : "success",
            "data" : data
        });
    }

};

module.exports = container;