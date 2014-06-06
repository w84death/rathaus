
var hud = {

    item : null,

    description : null,

    init : function () {
        this.item = $("<div class='currentItem'></div>");
        this.description = $('#description');

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

        var label = $('<span>' + item.name + '</span>');

        this.item.append(img);
        this.item.append(label);
    },

    reset : function () {
        this.clearCurrentItem();
        player.item = null;
        this.hideItemDescription();
    },

    showItemDescription: function() {
        this.description.empty();
        var text=$('<span>If you want to open this door, you should find: <br /> '+maps.active.key.item.description+'</span>');
        this.description.append(text);
        this.description.show();
    },

    hideItemDescription: function(){
        this.description.empty();
        this.description.hide();
    }

}