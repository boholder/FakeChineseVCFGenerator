class PhoneNumberGenerator {
    static #chinaMobileHeads = [134, 135, 136, 137, 138, 139, 150, 151, 152, 157, 158, 159, 182, 183, 184, 187, 188];
    static #chinaUnicomHeads = [130, 131, 132, 155, 156, 185, 186];
    static #chinaTelecomHeads = [133, 153, 180, 181, 189];
    static #allHeads =
        this.#chinaMobileHeads
            .concat(this.#chinaUnicomHeads)
            .concat(this.#chinaTelecomHeads);

    static generateOne() {
        let randomHeadIndex = Math.floor(Math.random() * this.#allHeads.length);
        let random8NumberTail = Math.random().toString().substr(2, 8);
        let phoneNumber = this.#allHeads[randomHeadIndex] + random8NumberTail;
        return phoneNumber;
    }

    static generateSet(amount) {
        let set = new Set();
        for (let i = 0; i < amount; i++) {
            set.add(this.generateOne());
        }
        return set;
    }
}

module.exports = PhoneNumberGenerator;