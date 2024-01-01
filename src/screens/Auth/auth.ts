import * as SecureStore from 'expo-secure-store';

interface Auth {
    token: string | null; 
    authenticated: boolean;
}

async function setAuth(auth: Auth) {
    await SecureStore.setItemAsync("auth", JSON.stringify(auth));
}

async function setToken(userId: string) {
    await SecureStore.setItemAsync("token", userId);
}

async function setUserId(userId: string) {
    await SecureStore.setItemAsync("user-id", userId);
}
  
async function auth() {
    let auth: Auth;
    let result:string | null = await SecureStore.getItemAsync("auth");
    
    if (result) {
        auth = JSON.parse(result);
    } else {
        auth = {
            token: null,
            authenticated: false
        }
    }
    return auth;
}

async function userId() {
    let result:string | null = await SecureStore.getItemAsync("user-id");
    
    if (result) {
        return result;
    }
    return null;
}

async function token() {
    let result:string | null = await SecureStore.getItemAsync("token");
    
    if (result) {
        return result;
    }
    return null;
}

export { setAuth, auth, setUserId, userId, setToken, token };