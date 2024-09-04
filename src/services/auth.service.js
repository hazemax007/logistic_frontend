import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  async login(username, password) {
    const response = await axios
      .post(API_URL + "signin", {
        username,
        password
      });
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }

   verifyUser (verifyToken) {
    return axios.get(API_URL + `confirm/${verifyToken}`);
  };

  forgetPassword(email){
    return axios.post(API_URL + "forget-password", email)
  }

    getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  googleLogin () {
		window.open(
			`${process.env.REACT_APP_API_URL}/auth/google/callback`,
			"_self"
		);

	};

  getGoogleUser () {
		try {
			const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
			const  {data}  =  axios.get(url, { withCredentials: true });
			//setUserGoogle(data.user._json);
      //console.log(userGoogle)
      return JSON.parse(localStorage.getItem('userGoogle', data.user._json));
		} catch (err) {
			console.log(err);
		}
	};
}

export default new AuthService();