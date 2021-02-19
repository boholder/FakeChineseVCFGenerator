const fs = require(`fs`)
const path = require(`path`)
const faker = require(`faker`)
const phoneNumberGenerator = require('./core/phone-number-generator')
const {NameModel} = require("./core/name-generators/name-model");
const {ServiceProviderNameGenerator} = require("./core/name-generators/service-provider-name-generator");
const {ColleagueNameGenerator} = require("./core/name-generators/colleague-name-generator");
const {FamilyNameGenerator} = require("./core/name-generators/family-name-generator");
const {RandomSelector} = require("./core/name-generators/random-selector");

const numOfContactsToGenerate = 100
// https://github.com/Marak/faker.js#localization
faker.locale = "zh_CN";
const filePath = `./important-contacts-${numOfContactsToGenerate}.vcf`;

const nameGeneratorSelector = new RandomSelector(
    [FamilyNameGenerator, 2],
    [ColleagueNameGenerator, 1],
    [ServiceProviderNameGenerator, 1],
    [{
        random: () => {
            return new NameModel().toString()
        }
    }, 10])

const contactsFile = path.resolve(filePath);
if (fs.existsSync(contactsFile)) {
    fs.unlinkSync(contactsFile);
}
fs.openSync(contactsFile, `w`);

console.log("Begin generating...");
let phoneNumberSet = phoneNumberGenerator.generateSet(
    Math.ceil(numOfContactsToGenerate / 2 * 3));
let phoneNumbers = Array.from(phoneNumberSet);
let phoneNumberIndex = 0;

for (let i = 1; i <= numOfContactsToGenerate; i++) {
    const firstName = nameGeneratorSelector.random().random();
    const lastName = '';

    const formattedDate = faker.date.past().toISOString().replace(/-/g, ``).replace(/:/g, ``).replace(/\..*$/, ``) + `Z`

    // https://www.evenx.com/vcard-3-0-format-specification
    let contactFormat1 =
        `BEGIN:VCARD
VERSION:3.0
N:${lastName};${firstName};;;
FN:${lastName} ${firstName}
TEL;TYPE=HOME:${phoneNumbers[phoneNumberIndex]}
REV:${formattedDate}
END:VCARD

`;

    let contactFormat2 =
        `BEGIN:VCARD
VERSION:3.0
N:${lastName};${firstName};;;
FN:${lastName} ${firstName}
TEL;TYPE=HOME:${phoneNumbers[phoneNumberIndex]}
TEL;TYPE=WORK:${phoneNumbers[phoneNumberIndex + 1]}
REV:${formattedDate}
END:VCARD

`;

    /* eslint-disable */
    if (i % 2 === 0) {
        fs.appendFileSync(contactsFile,
            contactFormat1);
        phoneNumberIndex += 1;
    } else {
        fs.appendFileSync(contactsFile,
            contactFormat2);
        phoneNumberIndex += 2;
    }
    /* eslint-enable */
}

fs.closeSync(0);
console.log("Done.")