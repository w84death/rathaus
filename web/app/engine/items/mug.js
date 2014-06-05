
Mug.prototype = new Item();
Mug.prototype.constructor = Mug;

function Mug () {
    this.name = 'Mug';
    this.id = 'Wks5av3Sxwz8rR';

    this.fetchDescription();
}

availableItems.push(new Mug());