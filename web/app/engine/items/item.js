
function Item () {
    this.name = null;
    this.id = null;
    this.descriptionId = null;
    this.description = null;
}

Item.prototype.toString = function () {
    return this.name;
}

Item.prototype.getDescription = function () {
    return this.description;
}

Item.prototype.fetchDescription = function () {
    var that = this;

    dictionary.query(this.name, function (descriptions) {
        for (var i = descriptions.length - 1; i >= 0; i--) {
            if (descriptions[i].id == that.descriptionId) {
                that.description = descriptions[i].senses[0].description;
                break;
            }
        };
    });
}

Item.prototype.getImageUrl = function () {
    return images.getImageUrl(this.id);
}