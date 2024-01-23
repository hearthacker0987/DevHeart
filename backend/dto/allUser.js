class AllUserDTO {
    constructor(user){
        this._id = user._id;
        this.name = user.name;
        this.username = user.username;
        this.email = user.email;
        this.createdAt = user.createdAt; 
    }
}

module.exports = AllUserDTO;