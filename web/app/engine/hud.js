
var hud = {

    item : null,
    isDescription: false,

    description : null,

    init : function () {
        this.item = $("<div id='currentItem'></div>");
        this.description = $('#description');

        $('.viewport').append(this.item);

        console.log(':: HUD initialized');
    },

    clearCurrentItem : function () {
        this.item.empty();
        this.item.hide();
    },

    setCurrentItem : function (item) {
        this.clearCurrentItem();

        var img = $('<img />');
        img.attr('src', item.getImageUrl());

        var label = $('<span>' + item.name + '</span>');

        this.item.append(img);
        this.item.append(label);
        this.item.show();
        console.log(this.item);
    },

    reset : function () {
        this.clearCurrentItem();
        player.item = null;
        this.hideItemDescription();
    },

    showItemDescription: function() {
        if (!this.isDescription){
            this.description.empty();
            var text=$('<span>If you want to open this door, you should find: <br /> '+maps.active.key.item.description+'</span>');
            this.description.append(text);
            this.description.show();
            this.isDescription = true;
        }
    },

    hideItemDescription: function(){
        this.description.empty();
        this.description.hide();
        this.isDescription = false;
    }

}