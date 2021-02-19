const {NameModel} = require("./name-model");
const {RandomSelector} = require("./random-selector");
const Mustache = require('mustache');

exports.ServiceProviderNameGenerator = class ServiceProviderNameGenerator {

    static #expresses = new RandomSelector(
        ["顺丰{{piece}}", 1], ["申通{{piece}}", 1], ["圆通{{piece}}", 1],
        ["韵达{{piece}}", 1], ["京东{{piece}}", 1],
        ["中通{{piece}}", 1], ["宅急送{{piece}}", 1],
        ["中国邮政{{piece}}", 1], ["百世汇通{{piece}}", 1]);

    static #expressPieces = new RandomSelector(
        ["快递", 4], ["快递员", 3], ["小哥", 1], ["", 3]
    )

    static #fruitAndVegetableShops = new RandomSelector(
        ["蔬果行", 1], ["{{piece}}生鲜便利店", 1], ["鲜{{piece}}", 1],
        ["宜菜异家", 1], ["大谷仓{{piece}}店", 1], ["乐百世{{piece}}", 1],
        ["开心菜园", 1], ["黄土地{{piece}}", 1], ["百姓{{piece}}海鲜店", 1],
        ["海潮菜园", 1], ["潮乡邻居{{piece}}", 1], ["好民声{{piece}}", 1],
        ["百姓乐{{piece}}", 1], ["惠万家{{piece}}店", 1], ["绿潮{{piece}}", 1],
        ["民所需{{piece}}", 1], ["学士菜园", 1], ["为民{{piece}}", 1],
        ["天天鲜{{piece}}", 1], ["冠军{{piece}}店", 1], ["百姓阳光{{piece}}", 1],
        ["乡下肉菜便利店", 1], ["祥板{{piece}}店", 1], ["田娃子{{piece}}店", 1],
        ["小区菜篮子", 1], ["绿色屋", 1], ["果蔬多", 1], ["{{piece}}店", 1],
        ["平价{{piece}}店", 1], ["佳乡缘{{piece}}店", 1], ["老味佳{{piece}}店", 1],
        ["素食主义{{piece}}", 1], ["{{piece}}店", 1], ["小区放心菜", 1],
        ["春兰{{piece}}便利店", 1], ["金口{{piece}}", 1], ["鲜迎仙果蔬店", 1],
        ["小百姓{{piece}}", 1], ["优嘉{{piece}}", 1], ["万家鲜{{piece}}店", 1],
        ["土老哥{{piece}}店", 1], ["新村长{{piece}}", 1], ["农家乐{{piece}}", 1],
        ["咱老百姓{{piece}}", 1], ["鲜之蔬", 1], ["国云{{piece}}店", 1],
        ["惠鲜{{piece}}", 1], ["鲜再来", 1], ["四季之友{{piece}}", 1],
        ["四季{{piece}}", 1], ["春馋{{piece}}", 1], ["村之蔬", 1],
        ["熟地头{{piece}}店", 1], ["康福莱{{piece}}", 1], ["{{piece}}佳", 1],
        ["艾莱{{piece}}", 1], ["富潮{{piece}}", 1], ["日日鲜{{piece}}", 1],
        ["金达{{piece}}店", 1], ["鲜的美{{piece}}", 1])

    static #fruitAndVegetablePieces = new RandomSelector(
        ["蔬菜", 1], ["水果", 1]
    )

    static #groceryStores = new RandomSelector(
        ["金跃{{piece}}", 1], ["果传奇{{piece}}", 1], ["挽情思{{piece}}", 1], ["银马{{piece}}", 1],
        ["速增元{{piece}}", 1], ["仟佰荟{{piece}}", 1], ["依葡味{{piece}}", 1], ["建风贵{{piece}}", 1],
        ["千森采{{piece}}", 1], ["飞飞茂{{piece}}", 1], ["鑫北方{{piece}}", 1], ["雅加奴{{piece}}", 1],
        ["大地橙{{piece}}", 1], ["乾芝堂{{piece}}", 1], ["琪鑫汇{{piece}}", 1], ["泰唐{{piece}}", 1],
        ["伊豆奶{{piece}}", 1], ["卓芮斯{{piece}}", 1], ["意进润{{piece}}", 1], ["合百客{{piece}}", 1],
        ["品时光{{piece}}", 1], ["佳昊昌{{piece}}", 1], ["迪赫尔{{piece}}", 1], ["汇都{{piece}}", 1],
        ["好滋莱{{piece}}", 1], ["果鲜府{{piece}}", 1], ["京华{{piece}}", 1], ["艾维索{{piece}}", 1],
        ["海恋怡{{piece}}", 1], ["朗嘉缘{{piece}}", 1], ["聚昌泰{{piece}}", 1], ["不苹凡{{piece}}", 1],
        ["佳久汇{{piece}}", 1], ["微品坊{{piece}}", 1], ["淘利升{{piece}}", 1], ["东辉复{{piece}}", 1],
        ["林家果{{piece}}", 1], ["鲜果香{{piece}}", 1], ["引念晚{{piece}}", 1], ["鼎大亚{{piece}}", 1],
        ["香衣阁{{piece}}", 1], ["德尔莱{{piece}}", 1], ["金雅盛{{piece}}", 1], ["果然粒{{piece}}", 1],
        ["诚悦{{piece}}", 1], ["月牙儿{{piece}}", 1], ["三人禾{{piece}}", 1], ["景云泽{{piece}}", 1],
        ["万东协超", 1], ["纸飞机{{piece}}", 1], ["妙凌迈{{piece}}", 1], ["果飘香{{piece}}", 1],
        ["祥和{{piece}}", 1], ["枫情{{piece}}", 1], ["穿越{{piece}}", 1], ["三颗枣{{piece}}", 1],
        ["七彩屋{{piece}}", 1], ["香香客{{piece}}", 1], ["苏染烟{{piece}}", 1], ["谦茂汇{{piece}}", 1],
        ["家常园{{piece}}", 1], ["花雨伞{{piece}}", 1], ["海之恋{{piece}}", 1], ["茶枝唯{{piece}}", 1],
        ["佑擎安{{piece}}", 1], ["清润全{{piece}}", 1], ["彩衣阁{{piece}}", 1], ["欢庆{{piece}}", 1],
        ["汇金面{{piece}}", 1], ["亚梦娜{{piece}}", 1], ["汇亨德{{piece}}", 1], ["雨潇生{{piece}}", 1],
        ["水中月{{piece}}", 1], ["天隆达{{piece}}", 1], ["韵泽坊{{piece}}", 1], ["天鲜乐{{piece}}", 1],
        ["邦广世{{piece}}", 1]);

    static #maintainers = new RandomSelector(
        ["电视{{piece}}", 1], ["冰箱{{piece}}", 1], ["洗衣机{{piece}}", 1],
        ["空调{{piece}}", 1], ["油烟灶{{piece}}", 1],
        ["热水器{{piece}}", 1], ["水管{{piece}}", 1], ["家电{{piece}}", 1],
        ["宽带{{piece}}", 1], ["燃气{{piece}}", 1],
        ["下水道{{piece}}", 1], ["物业{{piece}}", 1]);

    static #maintainerPieces = new RandomSelector(
        ["{{lastName}}师傅", 2], ["维修", 2], ["维护", 1],
    )

    // 快递，蔬菜水果店，超市，维修
    static #nameTypes = new RandomSelector(
        [this.randomExpress, 2],
        [this.randomFruitAndVegetableShop, 2],
        [this.randomGroceryStore, 1],
        [this.randomMaintainer, 3]);

    static random() {
        return this.randomModel().toString();
    }

    static randomModel() {
        return this.#nameTypes.random().call(this);
    }

    static randomExpress() {
        return ServiceProviderNameGenerator.#randomNameModel(
            this.#expresses,
            this.#expressPieces);
    }

    static #randomNameModel(pattern, piece) {
        let fullNamePattern = Mustache.render(
            pattern.random(), {piece: piece.random()});
        return new NameModel(null, fullNamePattern);
    }

    static randomFruitAndVegetableShop() {
        return ServiceProviderNameGenerator.#randomNameModel(
            this.#fruitAndVegetableShops,
            this.#fruitAndVegetablePieces);
    }

    static randomGroceryStore() {
        return ServiceProviderNameGenerator.#randomNameModel(
            this.#groceryStores,
            {
                random: () => {
                    return '超市';
                }
            });
    }

    static randomMaintainer() {
        return ServiceProviderNameGenerator.#randomNameModel(
            this.#maintainers,
            this.#maintainerPieces);
    }
}