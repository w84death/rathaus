
var dictionary = {

    options : {
        apiKey : 'q0X0eBgwsN965QIZcDMCfDvrAqoDLRuU',
    },

    query : function (keyword, callback) {
        var url = 'http://api.pearson.com/v2/dictionaries/entries?part_of_speech=noun&headword='
            + keyword + '&apikey=' + this.options.apiKey;

        $.getJSON(url, function (data) {
            callback(data.results[0].senses[0].definition);
        });
    }

}