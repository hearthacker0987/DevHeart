const User = require("../models/user");
const AllUserDTO = require('../dto/allUser');
const UserController = {
    async allUsers(req,res,next){
        let users;
        try {
           users = await User.find({});
        } catch (error) {
            return error
        }
        let allUsers = [];
        let counter = 0;
        for(let i=0; i < users.length;i++){
            const data = new AllUserDTO(users[i]);
            allUsers.push(data);
            counter++;
        }
        res.status(200).json({users: allUsers,totalUser:counter});
    },
}

module.exports = UserController;