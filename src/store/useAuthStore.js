import { create } from "zustand";

// SKELETON — fill in the four actions, following the auth demo from class.
// It uses the DummyJSON auth API. The state is done for you.
const API = "https://dummyjson.com";

export const useAuthStore = create((set, get) => ({
  // The token starts from localStorage, so a refresh keeps you logged in.
  token: localStorage.getItem("token") || null,
  user: null,
  status: "idle", // "idle" | "loading" | "error"
  error: "",

  // TODO: login(username, password)
  //   POST `${API}/auth/login` with { username, password }.
  //   On success: save data.accessToken to localStorage, set({ token, user }); return true.
  //   On a bad login: set({ error: ... }); return false.
  login: async (username, password) => {

     set({status: "loading", error: "" })

     try {
       const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, password})
       }) 

       const data = await res.json()

       if (!res.ok) throw new Error("Wrong Username or Password")

       const token = data.accessToken || data.token
       localStorage.setItem("token", token)

       set({token, user: data, status: "idle"})

       return true

     } catch(err) {
      set({status: "error", error: err.message})
      return false
     }


  },

  // TODO: fetchMe()
  //   If there is no token, return. Otherwise GET `${API}/auth/me`
  //   with the header  Authorization: `Bearer ${token}`  and set({ user }).
  //   If it fails, call logout().
  fetchMe: async () => {
    const token = get() .token
    if (!token) return
    try {
      const res = await fetch(`${API}/auth/me`, {
        headers: {Authorization: `Bearer ${token}`}
      })
      if (!res.ok) throw new Error("Session Expired")
        set({ user: await res.json() })

    } catch(err) {
      set({ status: "error", error: err.message})
    }
  },

  // TODO: signup(details)
  //   POST `${API}/users/add` with details; return the created account.
  signup: async (firstName,email, password) => {
    set({ status: "loading", error: ""});
    console.log(firstName, password, "test2")

    try {
      const res = await  fetch( `${API}/users/add`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          firstName,
          email,
          password
        })
       
        
      })

        const data = await res.json();
        console.log(data, "test 1")

        if (!res.ok) { 
          throw new Error(data.message || "SignUp Failed")

        }

        const token = data.accessToken || data.token;

        if (token) {
          localStorage.setItem("token", token)

          set({token, user: data, status: "idle", error: "" })

        } else {
          set({status: "idle", error: ""});

        } 

        return true;
      
    } catch (err) {
      set({ status: "error", error: err.message})
    }

  },

  // TODO: logout()
  //   Remove the token from localStorage, then set({ token: null, user: null }).
  logout: () => {
    localStorage.removeItem("token")
    set({ token: null, user: null, error: ""})
  },
}));
