const {NameModel} = require("./name-model");
const {RandomSelector} = require("./random-selector");

exports.FamilyNameGenerator = class FamilyNameGenerator {

    static #relations = new RandomSelector(
        ["哥", 2], ["姐", 2], ["叔", 2],
        ["舅", 2], ["舅妈", 2], ["姑", 2], ["姑父", 2],
        ["姨", 2], ["姨父", 2], ["嫂", 2],
        ["妈妈", 1], ["爸爸", 1]);

    static #orders = new RandomSelector(
        ["大", 1], ['二', 1], ['三', 1]);

    static #nickNames = new RandomSelector(["老", 1], ["小", 1]);

    // fullName = [昵称姓 20%|名称呼 70% |带次序称呼 10%]
    static #nameTypes = new RandomSelector(
        [this.randomNickName, 2],
        [this.randomRelationName, 7],
        [this.randomPureRelation, 1]);

    static random() {
        return this.randomModel().toString();
    }

    static randomModel() {
        return this.#nameTypes.random().call(this);
    }

    // 例：老李，小刘
    static randomNickName() {
        return new NameModel(null,
            `${this.#nickNames.random()}{{lastName}}`);
    }

    // 例：文春叔，卫华姐
    static randomRelationName() {
        return new NameModel(null,
            `{{firstName}}${this.#relations.random()}`);
    }

    // 例：三哥，大姨
    static randomPureRelation() {
        return new NameModel(null,
            `${this.#orders.random()}${this.#relations.random()}`);
    }
}