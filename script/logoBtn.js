import '../style/logoBtn.css'

import { Menu } from "../script/menu"
import { Html } from "../script/htmlContent"
import { Rlayer } from "./rightlayer"
import { LogoMAccount } from "./logoMenuAccount"
import { Tools } from './toolShop'
import { dictionary } from './dictionary'

class LogoButton {
    constructor() {
        this.content = Html.logoBtn;

        this.create();
    }

    create() {
        let $logoBtn = $(`${this.content}`);
        $("#logo").append($logoBtn)
        var layerIndex = null;
        $logoBtn.click(function (e) {
            e.stopPropagation();
            if (!layerIndex) {
                let index = layer.open(Menu.logoMenu($(this)))
                Menu.logoMenuClickEvent();
                layerIndex = index;
            }
            else {
                layer.close(layerIndex);
                layerIndex = null;
            }
        })

        $("body").click(function () {
            if (layerIndex) {
                layer.close(layerIndex);
                layerIndex = null;
            }
        });

        this.displayStreak();
    }

    displayStreak() {
        dictionary.getStreak().then((data) => {
            //console.log(data);
            let num = data.number
            $("#logo-userName").before(`<span id='logo-streak'>${Tools.numberToEmojy(num)}</span>`)
        })
    }

    static showAccountSetting() {
        new Rlayer().show();
        $("#rlayer").append($(`${Html.logoMenuAccount()}`))
        new LogoMAccount();
    }


}

export { LogoButton };