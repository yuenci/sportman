import { PracticeLayer } from './practiceLayer.js'
import { Tools } from './toolShop.js'
import '../style/sentence.css'
import { Menu } from "../script/menu"
import { Content } from './contentObj'
import { Brand } from "../script/brand"
import { Html } from "../script/htmlContent"

class sentence {
    constructor(sen, time) {
        this.sen = sen;
        this.time = time
        this.sentenceContent = Html.sentence(sen, time)

        return this.init();
    }

    // 把例子变成一个例子对象，加到content区域，然后加上事件
    init() {
        let $sen = $(this.sentenceContent)

        //给时间组件添加事件
        $sen.find(".sentence-upper-time").click(this.timeBtnClickEvent)

        //给菜单按钮添加事件
        $sen.find(".sentence-upper-menu-btn").click(this.meunBtnClickEvent)

        //给word 添加事件
        $sen.find(".main-word").each(function () {
            $(this).click(function () {
                let word = $(this).text().trim().toLowerCase()
                localStorage.setItem("currentWord", word);

                Tools.ifstartedLearing(word).then(function (status) {
                    //console.log(status);
                    if (status) {
                        localStorage.setItem("currentPage", "read");
                    } else {
                        localStorage.setItem("currentPage", "explains");
                    }
                    PracticeLayer.getInstance(word);
                    PracticeLayer.show();
                })
            })
        })

        //给tag 添加事件
        $sen.find(".tag").each(function () {
            let $senJQObj = $(this);
            let text = $senJQObj.text();
            let textWithoutPound = text.substring(1, text.length);
            $senJQObj.unbind();
            $senJQObj.click(function () {
                Content.queryAllDESC(text);
                let brand = new Brand();
                brand.showTag(textWithoutPound)
            })
        })

        //给句子加双击事件
        $sen.dblclick(function () {
            console.log("double click");
            let text = $(this).find(".sentence-content").text()
            console.log(text);
            $("#inbox-ta").val(text)
        });

        return $sen
    }

    timeBtnClickEvent = () => {
        let text = $(this)[0]["time"]
        Content.queryTimeDESC(text);
        let brand = new Brand();
        brand.showTag(text.substring(0, 10))
    }

    meunBtnClickEvent() {
        layer.open(Menu.sentenceMenu($(this)));
    }

}



export { sentence };