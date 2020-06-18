import { Page } from "../../core/Page";
import { $ } from "@core/dom";
import { Card } from "@/components/Card/Card";

export class CardPage extends Page {
    static className = ["card", "container"]

    getRoot(){
        this.card = new Card()

        return this.card.getRoot()
    }
}