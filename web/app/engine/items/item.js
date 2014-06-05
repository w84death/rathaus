
function Item () {
    this.name = null;
    this.pictureId = null;
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

    dictionary.query(this.name, function (description) {
        that.description = description;
    });
}