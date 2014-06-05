
var dictionary = {

    options : {
        apiKey : 'q0X0eBgwsN965QIZcDMCfDvrAqoDLRuU',
        requestType : 'GET',
        dataType : 'json'
    },

    query : function (keyword, callback) {
        var url = 'http://api.pearson.com/v2/dictionaries/entries?part_of_speech=noun&headword='
            + keyword + '&apikey=' + this.options.api_key;

        $.ajax({
            url : url,
            type : this.options.requestType,
            dataType : this.options.dataType,
            success : function (data) {
                callback(data.results[0].senses[0].definition);
            }
        });
    }

}