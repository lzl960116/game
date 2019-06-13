$(function () {
    let poke = [];
    let colorArr = ['s', 'h', 'd', 'c'];
    let flag = {};

    for (let i = 0; i < 52; i++) {
        let index = Math.floor(Math.random() * colorArr.length);
        let color = colorArr[index];
        let number = Math.round(Math.random() * 12 + 1);

        while (flag[color + '_' + number]) {
            index = Math.floor(Math.random() * colorArr.length);
            color = colorArr[index];
            number = Math.round(Math.random() * 12 + 1);
        }
        poke.push({color, number});
        flag[color + '_' + number] = true;

    }

    /*
    * 发牌
    * */

    let index = -1;
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j <= i; j++) {
            index++;
            let obj = poke[index];
            let lefts = 550 - 50 * i + 100 * j, tops = 50 * i+180;
            $("<div>")
                .addClass("pig")
                .css({backgroundImage: `url(./imgs/${obj.number}${obj.color}.jpg)`})
                .appendTo(".box")
                .attr('id', i + '_' + j)
                .data("number", obj.number)
                .delay(index * 100)
                .animate({left: 1010, top: 560})
                .animate({left: lefts, top: tops})
                .animate({left: 1010, top: 100})
                .animate({left: lefts, top: tops})
                .animate({left: 100, top: 100})
                .animate({left: lefts, top: tops})
                .animate({left: 100, top: 560})
                .animate({left: lefts, top: tops})
        }
    }

    for (; index < 52; index++) {
        let obj = poke[index];
        $("<div>")
            .addClass("pig left")
            .css({backgroundImage: `url(./imgs/${obj.number}${obj.color}.jpg)`})
            .appendTo(".box")
            .attr('id', -2 +"_"+ -2)
            .data("number", obj.number)
            .delay(index * 100)
            .animate({left: 1010, top: 560}).animate({left: 1010, top: 100})
            .animate({left: 100, top: 100}).animate({left: 100, top: 560})
    }
    let first = null;
    $(".box").on("click", ".pig", function () {
        let _this = $(this);
        let [i, j] = _this.attr("id").split("_");
        let id1 = i * 1 + 1 + "_" + j, id2 = i * 1 + 1 + "_" + (j * 1 + 1);
        if ($("#" + id1).length || $("#" + id2).length) {
            return;
        }
        if ($(this).hasClass("active")) {
            $(this).animate({top: '+=30px'}).removeClass("active");
        } else {
            $(this).animate({top: '-=30px'}).addClass("active");
        }
        if (!first) {
            first = _this;
        } else {
            let number1 = first.data("number");
            let number2 = $(this).data("number");
            if (number1 + number2 === 14) {
                $(".active").animate({top: "100px", left: "1010px", opacity: 0}, function () {
                    $(this).remove();
                })
            } else {
                $(".active").animate({top: "+=30px"}, function () {
                    $(this).removeClass("active");
                })
            }
            first = null;
        }
    });
    let n=0;
    $(".rightBtn").on("click",function () {
          $(".left").last().css("zIndex",n++).animate({left:"1010px"},function () {
              $(this).removeClass("left").addClass("right");
          })
    });
    let q=0;
    $(".leftBtn").on("click",function () {
        $(".right").first().css("zIndex",q++).animate({left:"100px"},function () {
            $(this).removeClass("right").addClass("left");
        })
    });
    $(".refresh").on("click",function () {
        location.reload(true);
    })
});