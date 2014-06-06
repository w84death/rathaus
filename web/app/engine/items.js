var items = {

    availableItems : [],

    currentItems : [],

    spriteMap : [],

    visibleSprites : [],

    oldVisibleSprites : [],

    initItems: function () {
        this.currentItems = [];
        var level = maps.active.level;

        for (var i = maps.levels[level].items.length - 1; i >= 0; i--) {
            var randomedItem = null;
            var unique = true;
            do {
                randomedItem = this.pickRandomItem(this.availableItems);
                unique = true;

                for (var j = this.currentItems.length - 1; j >= 0; j--) {
                    if (this.currentItems[j].item.id == randomedItem.id) {
                        unique = false;
                        break;
                    }
                };
            } while (!unique);

            var item = {
                x: maps.levels[level].items[i].x,
                y: maps.levels[level].items[i].y,
                item: randomedItem,
                img: null,
                visible: false,
            };
            this.currentItems.push(item);
        };

        this.initSprites();
    },

    pickRandomItem : function (collection) {
        var randomedItem = 0;

        randomedItem = Math.floor(Math.random() * (collection.length));
        if (randomedItem == collection.length) {
            randomedItem = randomedItem - 1;
        }

        return collection[randomedItem];
    },

    initSprites : function () {
        $('img.item').remove();

        this.spriteMap = [];
        var level = maps.active.level;
        var map = maps.levels[level];

        for (var i = this.currentItems.length - 1; i >= 0; i--) {
            this.spriteMap[this.currentItems[i].y] = [];
        };

        var screen = $('#screen');
        for (var i = 0; i < this.currentItems.length; i++) {
            var sprite = this.currentItems[i];
            sprite.img = $('<img />');
            sprite.img.attr('src', sprite.item.getImageUrl());
            sprite.img.css('visibility', 'hidden');
            sprite.img.css('display', 'block');
            sprite.img.css('position', 'absolute');
            sprite.img.addClass('item');
            this.spriteMap[sprite.y][sprite.x] = sprite;
            screen.append(sprite.img);
        }
    },

    clearSprites : function () {
        this.oldVisibleSprites = [];
        for (var i = 0; i < this.visibleSprites.length; i++) {
            var sprite = this.visibleSprites[i];
            this.oldVisibleSprites[i] = sprite;
            sprite.visible = false;
            sprite.img.css('visibility', 'hidden');
        }
        this.visibleSprites = [];
    },

    dropItem: function() {
        hud.clearCurrentItem();
        player.item = null;
    },

    renderSprites : function () {
        var viewDist = (render.screenWidth/2) / Math.tan((render.fov / 2));

        for (var i = 0; i < this.visibleSprites.length; i++) {
            var sprite = this.visibleSprites[i];
            var img = sprite.img;
            sprite.img.css('visibility', 'visible');

            // Translate position to viewer space
            var dx = sprite.x + 0.5 - player.x;
            var dy = sprite.y + 0.5 - player.y;

            // Distance to sprite
            var dist = Math.sqrt(dx*dx + dy*dy);

            // Sprite angle relative to viewing angle
            var spriteAngle = Math.atan2(dy, dx) - player.rot;

            // Size of the sprite
            var size = viewDist / (Math.cos(spriteAngle) * dist * 2);

            // X-position on screen
            var x = Math.tan(spriteAngle) * viewDist;
            var left = (render.screenWidth/2 + x - size/2) + 'px';
            img.css('left', left);

            // Y is constant since we keep all sprites
            // at the same height and vertical position
            var top = ((render.screenHeight-size)/2) + 'px';
            img.css('top', top);
            var dbx = sprite.x - player.x;
            var dby = sprite.y - player.y;
            img.css('width', size + 'px');
            img.css('height', size + 'px');
            var blockDist = dbx*dbx + dby*dby;
            //var zIndex = 100 - (dist<<0);
            var zIndex = 1000000 - Math.floor(blockDist*1000);
            img.css('zIndex', zIndex);
        }

        // Hide the sprites that are no longer visible
        for (var i=0; i < this.oldVisibleSprites.length; i++) {
            var sprite = this.oldVisibleSprites[i];
            if (this.visibleSprites.indexOf(sprite) < 0) {
                sprite.visible = false;
                sprite.img.css('visibility', 'hidden');
            }
        }
    }
}