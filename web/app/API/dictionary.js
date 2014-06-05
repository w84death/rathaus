
var dictionary = {

    options : {
        api_key: 'q0X0eBgwsN965QIZcDMCfDvrAqoDLRuU'
    },

    query : function (keyword, callback) {
        var url = 'http://api.pearson.com/v2/dictionaries/entries?part_of_speech=noun&headword='
            + keyword + '&apikey=' + this.options.api_key;

            $.ajax({
                url : url,
                type: "GET",
                dataType: "json",
                success: function (data) {
                    callback(data.results[0].senses[0].definition);
                }
            });
    }

}