class HashMap {
    constructor(initialCapacity=8) {
        this.length = 0;
        this._slots = [];
        this._capacity = initialCapacity;
        this._deleted = 0;
    }

    get(key) {
        const index = this._findSlot(key);
        if (this._slots[index] === undefined) {
            throw new Error('Key error');
        }
        return this._slots[index].value;
    }

    set(key, value) {
        const loadRatio = (this.length + this._deleted + 1) / this._capacity;
        if (loadRatio > HashMap.MAX_LOAD_RATIO) {
            this._resize(this._capacity * HashMap.SIZE_RATIO);
        }

        const index = this._findSlot(key);
        if(!this._slots[index]) {
            this.length++;
        }
        this._slots[index] = {
            key,
            value,
            deleted: false
        };
    }

    remove(key) {
        const index = this._findSlot(key);
        const slot = this._slots[index];
        if (slot === undefined) {
            throw new Error('Key error');
        }
        slot.deleted = true;
        this.length--;
        this._deleted++;
    }

    _findSlot(key) {
        const hash = HashMap._hashString(key);
        const start = hash % this._capacity;

        for (let i=start; i<start + this._capacity; i++) {
            const index = i % this._capacity;
            const slot = this._slots[index];
            if (slot === undefined || (slot.key == key && !slot.deleted)) {
                return index;
            }
        }
    }

    toggleKeyExist(key) {
        let index = this._findSlot(key);
        const slot = this._slots[index];
        (slot === undefined) ? this.set(key) : this.remove(key);
    }

    _resize(size) {
        const oldSlots = this._slots;
        this._capacity = size;
        // Reset the length - it will get rebuilt as you add the items back
        this.length = 0;
        this._deleted = 0;
        this._slots = [];

        for (const slot of oldSlots) {
            if (slot !== undefined && !slot.deleted) {
                this.set(slot.key, slot.value);
            }
        }
    }

    static _hashString(string) {
        let hash = 5381;
        for (let i=0; i<string.length; i++) {
            hash = (hash << 5) + hash + string.charCodeAt(i);
            hash = hash & hash;
        }
        return hash >>> 0;
    }
}

HashMap.MAX_LOAD_RATIO = 0.9;
HashMap.SIZE_RATIO = 3;


//If it exist delete it else create it
//if there are multiple letters of odd numbers are

function palindrome(str) {
    const hashObj = new HashMap();

    for(let i = 0; i < str.length; i++) {
        hashObj.toggleKeyExist(str.charAt(i));   
    }
    console.log((hashObj.length === 0 || hashObj.length === 1) ? true : false);
}

//acecarra
//raceacar

//if the amount of non pair letters greater than 1 its not a palindrome.



function main() {
    // const lor = new HashMap();

    // lor.set('Hobbit', 'Bilbo');
    // console.log(lor)
    // lor.set('Hobbit', 'Frodo');
    // console.log(lor)
    // lor.set('Wizard', 'Gandolf');
    // lor.set('Human', 'Aragon');
    // lor.set('Elf', 'Legolas');
    // lor.set('Maiar', 'The Necromancer');
    // lor.set('Maiar', 'Sauron');
    // lor.set('RingBearer', 'Gollum');
    // lor.set('LadyOfLight', 'Galadriel');
    // lor.set('HalfElven', 'Arwen');
    // lor.set('Ent', 'Treebeard');
    // console.log(lor)

    // console.log('GET', lor.get('Hobbit'));
    palindrome('momo');
}

main();
