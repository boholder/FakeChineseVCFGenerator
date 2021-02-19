const faker = require(`faker`);
faker.locale = 'zh_CN';
const Mustache = require('mustache');

exports.NameModel = class NameModel {

    constructor(belonging = '', fullNamePattern = '') {
        // belonging field reminds you what is your relationship with him|her,
        // why are you have contact of him|her.
        this.belonging = belonging || '';
        this.firstName = faker.name.firstName();
        this.lastName = faker.name.lastName();
        let chineseStyleFullName = this.lastName + this.firstName;
        this.fullName = fullNamePattern ?
            this.renderFullName(fullNamePattern) :
            chineseStyleFullName;
    }

    renderFullName(fullNamePattern) {
        return Mustache.render(fullNamePattern, this);
    }

    toString() {
        return '' + this.belonging + this.fullName;
    }
}