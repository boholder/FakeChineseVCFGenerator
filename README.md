# Fake Chinese VCF file generator

A Node.js based script that specially generating fake VCF format Chinese contacts for messing up the phone address book.

[What is a Variant Call Format(VCF) file - wikipedia](http://en.wikipedia.org/wiki/Variant_Call_Format)

基于Node.js的假通讯录生成脚本。每个联系人只有名字和电话号码：

1. [faker.js](https://marak.github.io/faker.js/)对简体中文的支持不多，除了名字外其他的比较重要的字段比如职业地址之类都不支持。
2. 另外理由是我采样的几个通讯录的联系人都只有名字和电话号码，只生成名字和电话是为了模仿原有联系人的样式。

[VCF文件是什么-维基百科](http://en.wikipedia.org/wiki/Variant_Call_Format)

一百个随机名字展示:

```
赵炫明,洗衣机赵师傅,纸飞机超市,营销部陈俊驰,石弘文,中通快递,尹浩,赵伟泽,健柏姑,贺浩然,皓轩姑,阎笑愚,
晓啸嫂,龚浩宇,田娃子蔬菜店,综合部朱思聪,越泽哥,综合部冯烨磊,段建辉,擎宇姨,许嘉熙,苏修洁,吕琪,贺浩然,
程子轩,宋伟祺,龙浩然,方文轩,邱弘文,何立诚,胡烨霖,擎宇舅,叶健雄,邱烨磊,莫子骞,周鹏涛,钟晟睿,雷昊强,
营销部叶博超,烨磊叔,高子骞,邓思聪,莫绍齐,李子涵,明哲叔,王锦程,孟哲瀚,薛远航,吴鹏涛,丁黎昕,人力资源魏明,
鹏煊嫂,高浩轩,于苑博,运维邓嘉熙,晓啸叔,罗鹏煊,刘靖琪,顾擎苍,鲜之蔬,于健雄,毛致远,龚擎苍,赵鸿涛,
热水器维修,郭雨泽,晋鹏姑,袁志泽,白伟祺,毛昊强,史荣轩,许思,刘彬,尹烨伟,郝嘉熙,小于,营销部崔熠彤,
赖皓轩,姚鹏煊,赖炎彬,后勤邓胤祥,覃子默,蒋潇然,唐煜城,覃绍齐,孔熠彤,余炫明,潘航,伟宸叔,萧擎苍,丁风华,
许浩轩,佑擎安超市,财务陆浩宇,邹哲瀚,雷鑫磊,洪煜祺,热水器魏师傅,钱瑾瑜,白健雄,
```

我有自觉，虽然由我说有点怪，这个预设生成的通讯录名字的口气蛮中年人的。如果不满意这种口气，请自行微调或添加新的Generator类。