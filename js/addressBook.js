class AddressBook{
    get name() {return this._name;}
    set name(name) {
        let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z]{2,}$')
        if(nameRegex.test(name))
        this._name = name;
        else throw 'Name is incorrect';
    }

    get phoneNumber() {return this._phoneNumber;}
    set phoneNumber(phoneNumber){
        this._phoneNumber = phoneNumber;
    }

    get state() {return this._state;}
    set state(state) {
        this._state = state;
    }

    get city() {return this._city;}
    set city(city) {
        this._city = city;
    }

    get zip() {return this._zip;}
    set zip(zip) {
        this._zip = zip;
    }

    get address() {return this._address;}
    set address(address) {
        this._address = address;
    }

    toString() {
        return "Full Name: "+this.name+" Address: "+this.address+" State: "+this.state+
        " City: "+this.city+" Zip: "+this.zip+" Phone Number: "+this.phoneNumber;
    }
}