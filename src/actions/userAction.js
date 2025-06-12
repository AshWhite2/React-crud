import { supabase } from '../config/supabase'; 

export const GET_USERS_LIST = "GET_USERS_LIST";
export const GET_USER_DETAIL = "GET_USER_DETAIL";
export const POST_USER_CREATE = "POST_USER_CREATE";
export const PUT_USER_EDIT = "PUT_USER_EDIT";

export const getUsersList = () => {
  return async (dispatch) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      dispatch({
        type: GET_USERS_LIST,
        payload: {
          data: data,
          errorMessage: false,
        },
      });
    } catch (error) {
      dispatch({
        type: GET_USERS_LIST,
        payload: {
          data: false,
          errorMessage: error.message,
        },
      });
    }
  };
};

export const getUserDetail = (id) => {
  return async (dispatch) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      dispatch({
        type: GET_USER_DETAIL,
        payload: {
          data: data,
          errorMessage: false,
        },
      });
    } catch (error) {
      dispatch({
        type: GET_USER_DETAIL,
        payload: {
          data: false,
          errorMessage: error.message,
        },
      });
    }
  };
};

export const postUserCreate = (userData) => {
  return async (dispatch) => {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            first_name: userData.first_name,
            last_name: userData.last_name
          }
        }
      });

      if (authError) throw authError;

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          email: userData.email,
          first_name: userData.first_name,
          last_name: userData.last_name
        })
        .select()
        .single();

      if (profileError) throw profileError;

      dispatch({
        type: POST_USER_CREATE,
        payload: {
          data: profileData,
          errorMessage: false,
        },
      });

      return profileData;
    } catch (error) {
      dispatch({
        type: POST_USER_CREATE,
        payload: {
          data: false,
          errorMessage: error.message,
        },
      });
      throw error;
    }
  };
};

export const putUserUpdate = (updatedData, id) => {
  return async (dispatch) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updatedData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      dispatch({
        type: PUT_USER_EDIT,
        payload: {
          data: data,
          errorMessage: false,
        },
      });

      return data;
    } catch (error) {
      dispatch({
        type: PUT_USER_EDIT,
        payload: {
          data: false,
          errorMessage: error.message,
        },
      });
      throw error;
    }
  };
};

export const deleteUser = (id) => {
  return async (dispatch) => {
    try {
      const { error: authError } = await supabase.auth.admin.deleteUser(id);
      if (authError) throw authError;

      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', id);

      if (error) throw error;

      return true;
    } catch (error) {
      console.error('Delete user error:', error);
      throw error;
    }
  };
};

export const deleteDataUser = () => {
  return (dispatch) => {
    dispatch({
      type: GET_USER_DETAIL,
      payload: {
        data: false,
        errorMessage: false,
      },
    });

    dispatch({
      type: POST_USER_CREATE,
      payload: {
        data: false,
        errorMessage: false,
      },
    });
  };
};