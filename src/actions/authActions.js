import { supabase } from '../config/supabase';

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";
export const LOGOUT = "LOGOUT";
 
export const loginUser = (email, password) => {
  return async (dispatch) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        dispatch({ type: LOGIN_FAILED, payload: error.message });
        return false;
      }

      if (data.user) {
        
        const { data: userData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        const user = {
          ...data.user,
          ...userData
        };

        dispatch({ type: LOGIN_SUCCESS, payload: user });
        localStorage.setItem("user", JSON.stringify(user));
        return true;
      }
    } catch (error) {
      dispatch({ type: LOGIN_FAILED, payload: error.message });
      return false;
    }
  };
};

export const registerUser = (userData) => {
  return async (dispatch) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            first_name: userData.firstName,
            last_name: userData.lastName,
          },
          emailRedirectTo: `${window.location.origin}/welcome` // Optional
        }
      });

      if (error) throw error;

      // Create profile in your public.profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          email: userData.email,
          nama: userData.nama,
          alamat: userData.alamat,
          umur: userData.umur,
          nohp: userData.nohp
        });

      if (profileError) throw profileError;

      dispatch({ type: REGISTER_SUCCESS, payload: data.user });
      return data.user;

    } catch (error) {
      dispatch({ type: REGISTER_FAILED, payload: error.message });
      throw error;
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      localStorage.removeItem("user");
      dispatch({ type: LOGOUT });
    }
  };
};

export const checkAuth = () => {
  return async (dispatch) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: userData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      const fullUser = {
        ...user,
        ...userData
      };

      dispatch({ type: LOGIN_SUCCESS, payload: fullUser });
      localStorage.setItem("user", JSON.stringify(fullUser));
    }
  };
};