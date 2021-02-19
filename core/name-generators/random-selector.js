const faker = require(`faker`)

/*
For randomly selecting items.
 */
class ItemModel {
    content;
    weight;

    constructor(content = '', weight = 0) {
        this.content = content;
        this.weight = weight;
    }

    static buildModelsFrom2DimDataArray(itemArray = []) {
        let result = [];
        for (let item of itemArray) {
            result.push(this.#buildOneFromArray(item));
        }
        return result;
    }

    static #buildOneFromArray([content, weight] = ['', 0]) {
        return new ItemModel(content, weight);
    }
}

/*
Modified from https://github.com/thinnakrit/random-item-percent
 */
exports.RandomSelector = class RandomSelector {
    items;
    #weightSummation;
    #weightAccumulationMap;

    constructor(...itemDataArray) {
        this.items = [...ItemModel.buildModelsFrom2DimDataArray(itemDataArray)];
        this.#weightSummation = this.#summaryWeight()
        this.#weightAccumulationMap = this.#buildWeightMap(this.items);
    }

    #summaryWeight() {
        return this.items.reduce(
            (prev, curr) => prev + curr.weight, 0
        );
    }

    #buildWeightMap(models = []) {
        let accumulation = 0
        return models.map(
            ({weight}) => (accumulation = weight + accumulation)
        )
    }

    random() {
        return this.#randomModel().content;
    }

    #randomModel() {
        const randomWeight = Math.floor(Math.random() * this.#weightSummation);

        const itemIndex = this.#weightAccumulationMap.filter(
            element => element <= randomWeight).length // <= : not greater than

        return this.items.find(
            (_, index) => index === itemIndex   // predicate
        )
    }
}