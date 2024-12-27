import axios from "axios";



const DB_USERS_API = "http://localhost:8081/api/v1/users"

class DbService {
  
    

    getUsers(){
        return axios.get('http://localhost:8081/api/v1/users/list')
    }

    addUsers(users){
        axios.post(DB_USERS_API,users);
    }

    checkUsername(username) {
        return axios.get(`${DB_USERS_API}/check-username`, {
            params: { username }
        });
    }
}

export default new DbService()