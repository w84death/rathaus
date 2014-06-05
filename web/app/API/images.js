
var images = {

    options : {
        requestType : 'GET',
        dataType : 'json'
    },

    query : function (keyword, callback) {
        var url = 'http://api.pearson.com/dk/v1/images?keywords=' + keyword
            + '';

        $.ajax({
            url : url,
            type : this.options.requestType,
            dataType : this.options.dataType,
            success : function (data) {

                callback(data.images);
            }
        });
    },

    getImageUrl : function (id) {
        return 'http://api.pearson.com/dk/v1/images/' + id;
    }

}