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
  
  //   `${API}/auth/login` with { username, password }
  //   On success: save data.accessToken to localStorage, set({ token, user }); return true.
  //   On a bad login: set({ error: ... }); return false.
  login: async (username, password) => {

    set({ status: "loading", error: ""});

      try {
        const response = await fetch(`${API}/auth/login` , {
          method: "POST",
          headers: { "Content-Type" : "application/json"},
          body: JSON.stringify({username, password})


        });

       const data = await response.json();

        if (!response.ok) throw new Error ("Wrong Username or Password");
        const token = data.accessToken || data.token;
        localStorage.setItem("token", token);
        set({token, user: data, status: "idle"})
         

        return true;

     } catch(error) {
      set({status: "error", error: error.message});

      return false;

     }



  },
  

  // TODO: fetchMe()
  //   If there is no token, return. Otherwise GET `${API}/auth/me`
  //   with the header  Authorization: `Bearer ${token}`  and set({ user }).
  //   If it fails, call logout().
  fetchMe: async () => {

    const token = get().token;
    if(!token) return;
    try {
      const response = await fetch (`${API}/auth/me`, {

        headers: {Authorization: `Bearer ${token}`},

      });

      if(!response.ok) throw new Error ("Session expired") ;
      set({ user: await response.json() });
    } catch (error) {
      get().logout();
      return false
    }

  },

  // TODO: signup(details)
  //   POST `${API}/users/add` with details; return the created account.
  signup: async (details) => {

    set({ status: "loading", error: ""});
     try{

    const response = await fetch (`${API}/users/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(details)
    });

  
    const data = await response.json();
    set({ user: data, status: "idle"})
    return data;

     } catch (error) {
      set({ status: "error", error: error.message});
      return null;
      
     }
  },

  // TODO: logout()
  //   Remove the token from localStorage, then set({ token: null, user: null }).
  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, user: null, error: ""});
  },
}));
