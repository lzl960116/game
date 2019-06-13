$(function () {
    let box = $(".box");
    let flag = false;
    for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 15; j++) {
            $("<div>").addClass("chess").appendTo(box).attr('id', i + '_' + j);
        }
    }

    let black = {value:"黑子"}, white = {value:"白子"};


    $(box).on("click", ".chess", function () {
        let _this = $(this);
        let coords = _this.attr('id');
        if ($(this).hasClass("black") || $(this).hasClass("white")) {
            return flag;
        } else {
            if (flag) {
                $(this).addClass("black");
                black[coords] = true;
                flag = !flag;
                judge(black, coords);
            } else {
                $(this).addClass("white");
                white[coords] = true;
                flag = !flag;
                judge(white, coords);
            }
        }
    });

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
        x =i * 1;
        while (obj[++x + "_" + (++y)]) {
            n3++;
        }
        x=i*1;
        y=j*1;
        while (obj[--x + "_" + (--y)]) {
            n3++;
        }
        x=i*1;
        y=j*1;
        while (obj[--x + "_" + (++y)]) {
            n4++;
        }
        x=i*1;
        y=j*1;
        while (obj[++x + "_" + (--y)]) {
            n4++;
        }
        if(Math.max(n1,n2,n3,n4)>=5){
            $(box).off("click");
            alert("大吉大利，恭喜"+obj.value+"恰鸡！")
        }
    }
    $(".refresh").on("click",function () {
        location.reload(true);
    })
});