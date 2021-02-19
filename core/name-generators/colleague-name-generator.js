const {NameModel} = require("./name-model");
const {RandomSelector} = require("./random-selector");

exports.ColleagueNameGenerator = class ColleagueNameGenerator {

    static #departments = new RandomSelector(
        ["行政", 1], ["财务", 1], ["财务部", 1], ["人力", 1], ["人力资源", 1], ["技术部", 1],
        ["信息部", 1], ["运维", 2], ["营销部", 2], ["综合部", 2], ["后勤", 2]);

    static #appellations = new RandomSelector(
        ["处", 1], ["部长", 1], ["主任", 1], ["组长", 1],
        ["哥", 2], ["姐", 2], ["叔", 2],
        ["主管", 1], ["老师", 10]);

    static #nickNames = new RandomSelector(["老", 1], ["小", 1]);

    // 部门 + [昵称姓 10%|姓称呼 10% |姓名 80%]
    static #nameTypes = new RandomSelector(
        [this.randomNickName, 1],
        [this.randomAppellationName, 1],
        [this.randomPlainFullName, 8]);

    static random() {
        return this.randomModel().toString();
    }

    static randomModel() {
        return this.#nameTypes.random().call(this);
    }

    static randomNickName() {
        return this.#randomNameModel(
            `${this.#nickNames.random()}{{lastName}}`);
    }

    static #randomNameModel(fullNamePattern) {
        return new NameModel(
            this.#departments.random(),
            fullNamePattern);
    }

    static randomAppellationName() {
        return this.#randomNameModel(
            `{{lastName}}${this.#appellations.random()}`);
    }

    static randomPlainFullName() {
        return this.#randomNameModel();
    }
}