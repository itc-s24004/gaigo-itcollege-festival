import { db_user, db_userLevel } from "./db";


export class UserAccount {
    #id: string;
    #level: db_userLevel;

    #nickName: string;
    #email: string;
    constructor(data: db_user) {
        this.#id = data.id;
        this.#level = data.level;
        this.#nickName = data.nickname;
        this.#email = data.email;
    }


    get id() {
        return this.#id;
    }


    get nickName() {
        return this.#nickName;
    }


    get email() {
        return this.#email;
    }


    get level() {
        return this.#level;
    }


    get isStaff() {
        return this.#email.endsWith("@std.it-college.ac.jp");
    }


    get isAdmin() {
        return this.#level === db_userLevel.admin;
    }


    get isSuperAdmin() {
        return this.#level === db_userLevel.superAdmin;
    }

}



class Message {
    #eventId: string;
    #id: string;
    #date: Date;

    #title: string;
    #content: string;
    #imgs: string[];
    constructor(data: { eventId: string; id: string; date: Date; title: string; content: string; imgs: string[]; }) {
        this.#eventId = data.eventId;
        this.#id = data.id;
        this.#date = data.date;
        this.#title = data.title;
        this.#content = data.content;
        this.#imgs = data.imgs;
    }
}



class FestivalContent {
    #festivalId: string;
    #id: string;
    #name: string;
    #description: string;
    constructor(data: { festivalId: string; id: string; name: string; description: string }) {
        this.#festivalId = data.festivalId;
        this.#id = data.id;
        this.#name = data.name;
        this.#description = data.description;
    }
}








enum ShopCategory {
    food,
    drinks,
    experiences,
}








class Shop {
    #festivalId: string;
    #id: string;
    #category: ShopCategory;

    #name: string;
    #description: string;
    constructor(data: { festivalId: string; id: string; category: ShopCategory; name: string; description: string; }) {
        this.#festivalId = data.festivalId;
        this.#id = data.id;
        this.#category = data.category;
        this.#name = data.name;
        this.#description = data.description;
    }
}



class ShopItem {
    #shopId: string;
    #id: string;

    #name: string;
    #description: string;
    #price: number;
    #online: boolean;
    constructor(data: { shopId: string; id: string; name: string; description: string; price: number; online: boolean; }) {
        this.#shopId = data.shopId;
        this.#id = data.id;
        this.#name = data.name;
        this.#description = data.description;
        this.#price = data.price;
        this.#online = data.online;
    }
}