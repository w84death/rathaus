
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
            $('#description').innerHTML = maps.active.key.description;
    },
    HideItemDescription: function(){
            $('#description').empty();

    }

}