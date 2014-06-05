
var hud = {

    item : null,

    init : function () {
        this.item = $("<div class='currentItem'></div>");

        $('.viewport').append(this.item);

        console.log(':: HUD initialized');
    },

    clearCurrentItem : function () {
        this.item.empty();
    },

    setCurrentItem : function (item) {
        this.clearCurrentItem();

        var img = $('<img />');
        img.attr('src', item.getImageUrl());

        this.item.append(img);
    },

    reset : function () {
        this.clearCurrentItem();
    },
    showItemDescription: function(){
            $('#description').empty();
            var text=$('<span>If you want to open this door, you should find: '+maps.active.key.item.description+'</span>');
            $('#description').append(text);
    },
    hideItemDescription: function(){
            $('#description').empty();

    }

}