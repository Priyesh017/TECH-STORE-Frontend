import Cookies from "js-cookie";

const auth = {
  async register(event, setMessage, togglePopup, navigate) {
    event.preventDefault();
    setMessage(null);

    const formData = new FormData(event.target);
    const jsonData = Object.fromEntries(formData);

    const reqOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    };

    try {
      const req = await fetch(
        "http://127.0.0.1:1337/api/auth/local/register",
        reqOptions
      );
      const res = await req.json();

      if (res.error) {
        setMessage(res.error.message);
        togglePopup();
        return;
      }

      if (res.jwt && res.user) {
        // Store the user data in cookies
        Cookies.set(
          "user",
          JSON.stringify({
            username: res.user.username,
            email: res.user.email, // Assuming email is included in the response
            jwt: res.jwt,
          }),
          { expires: 7 }
        ); // Cookie expires in 7 days

        setMessage("Successful registration.");
        navigate("/"); // Redirect to home or dashboard page
      }
    } catch (error) {
      setMessage("An error occurred during registration.");
      togglePopup();
    }
  },

  async login(event, setMessage, togglePopup, navigate) {
    event.preventDefault();
    setMessage(null);
    const formData = new FormData(event.target);
    const jsonData = Object.fromEntries(formData);

    const reqOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    };

    try {
      const req = await fetch(
        "http://127.0.0.1:1337/api/auth/local",
        reqOptions
      );
      const res = await req.json();

      if (res.error) {
        setMessage(res.error.message);
        togglePopup();
        return;
      }

      if (res.jwt && res.user) {
        // Store the user data in cookies
        Cookies.set(
          "user",
          JSON.stringify({
            username: res.user.username,
            email: res.user.email, // Assuming email is included in the response
            jwt: res.jwt,
          }),
          { expires: 7 }
        ); // Cookie expires in 7 days

        setMessage("Login successful.");
        navigate("/"); // Redirect to home or dashboard page
      }
    } catch (error) {
      setMessage("An error occurred during login.");
      togglePopup();
    }
  },
};

export default auth;
