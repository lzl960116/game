$(function () {

    let black = {value: "黑子"}, white = {value: "白子"};
    let blank = {};
    let ai = true;
    let box = $(".box");
    let flag = false;
    for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 15; j++) {
            $("<div>").addClass("chess").appendTo(box).attr('id', i + '_' + j);
            blank[i + "_" + j] = true;
        }
    }

    $(box).on("click", ".chess", function () {
        let _this = $(this);
        let coords = _this.attr('id');
        if ($(this).hasClass("black") || $(this).hasClass("white")) {
            return flag;
        } else {
            if (flag) {
                $(this).addClass("black");
                black[coords] = true;
                delete blank[coords];
                flag = !flag;
                judge(black, coords);
                if (judge(black, coords) >= 5) {
                    box.off("click");
                    alert("黑子赢");

                }
            } else {
                $(this).addClass("white");
                white[coords] = true;
                delete blank[coords];
                flag = !flag;
                judge(white, coords);
                if (judge(white, coords) >= 5) {
                    box.off("click");
                    alert("白子赢");
                }
            }
            if (ai) {
                let pos = aifn();
                console.log(pos);
                black[pos] = true;
                delete blank[pos];
                $("#" + pos).addClass("black");
                if (judge(black, pos) >= 5) {
                    alert("黑子赢");
                    box.off("click");
                }
                flag = !flag;
            }
        }
    });

    function aifn() {
        let blackScore = 0, whiteScore = 0;
        let pos1 = "", pos2 = "";
        for (let i in blank) {
            let score = judge(black, i);
            if (score >= blackScore) {
                blackScore = score;
                pos1 = i;
            }
        }
        for (let i in blank) {
            let score = judge(white, i);
            if (score >= whiteScore) {
                whiteScore = score;
                pos2 = i;
            }
        }
        return blackScore >= whiteScore ? pos1 : pos2;
    }

    function judge(obj, coords) {
        let [i, j] = coords.split("_");
        let x = i * 1, y = j * 1;
        let n1 = 1;//左右方向
        let n2 = 1;//上下
        let n3 = 1;//左上右下
        let n4 = 1;//右上左下
        while (obj[x + "_" + (++y)]) {
            n1++;
        }
        y = j * 1;
        while (obj[x + "_" + (--y)]) {
            n1++;
        }
        y = j * 1;
        while (obj[++x + "_" + y]) {
            n2++;
        }
        x = i * 1;
        while (obj[--x + "_" + y]) {
            n2++;
        }
        x = i * 1;
        while (obj[++x + "_" + (++y)]) {
            n3++;
        }
        x = i * 1;
        y = j * 1;
        while (obj[--x + "_" + (--y)]) {
            n3++;
        }
        x = i * 1;
        y = j * 1;
        while (obj[--x + "_" + (++y)]) {
            n4++;
        }
        x = i * 1;
        y = j * 1;
        while (obj[++x + "_" + (--y)]) {
            n4++;
        }

            return Math.max(n1, n2, n3, n4);

    }

    $(".refresh").on("click", function () {
        location.reload(true);
    })
});