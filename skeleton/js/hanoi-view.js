(function () {
    if (typeof Hanoi === "undefined") {
        window.Hanoi = {};
    }

    var View = Hanoi.View = function (game, $el) {
        this.game = game;
        this.$el = $el;
        this.render();
        this.bindEvents();
    };

    View.NUM_PEGS = 3;

    View.prototype.bindEvents = function () {
        var that = this;
        this.$el.on('click', '.peg', function (event) {
            console.log(that.$twr1);

            if (that.$twr1 === undefined) {

                that.$twr1 = $(event.currentTarget);
            } else {
                that.clickTower(that.$twr1, $(event.currentTarget));
                delete that.$twr1;
            }
        });
    };

    View.prototype.clickTower = function ($twr1, $twr2) {
        console.log($twr2);
        var status = this.game.move($twr1.data("idx"), $twr2.data("idx"));
        if (status === false) {
            alert("Invalid move!");
        } else {
            this.render();
            if (this.game.isWon()) {
                alert("You win!!");
            }
        }
    };

    View.prototype.render = function () {
        $(".peg").remove();
        for (var i = 0; i < View.NUM_PEGS; i++) {
            var $peg = $("<div class='peg'>");
            $peg.data("idx", i );
            var currentPeg = this.game.towers[i];
            for (var j = 2; j >= 0; j--) {
                if (!(currentPeg[j] === "undefined")) {
                    var $disc = $("<div class='disc d" + currentPeg[j] +"'>");
                    $peg.append($disc);
                } else {
                    var $discSpace = $("<div>");
                    $peg.append($discSpace);
                }
            }
            this.$el.append($peg);
        }
    };
})();
