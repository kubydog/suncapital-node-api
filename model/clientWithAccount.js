class ClientWithAccount {
    constructor(client, accounts) {
        this.firstName = client.firstName;
        this.lastName = client.lastName;
        this.chineseName = client.chineseName;
        this.birthDate = client.birthDate;
        this.mobile = client.mobile;
        this.address = client.address;
        this.suburb = client.suburb;
        this.state = client.state;
        this.postCode = client.postCode;
        this.identityType = client.identityType;
        this.identity = client.identity;
        this.identityExpireDate = client.identityExpireDate;
        this.accounts = accounts;
        this._id = client._id;
    }
}

module.exports = ClientWithAccount;
