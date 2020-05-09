import * as SecureStore from 'expo-secure-store';


export async function writeToCache(key, value) {
    await SecureStore.setItemAsync(key, value);
}

export async function readFromCache(key) {
    const value = await SecureStore.getItemAsync(key);
    return value;
}

export async function deleteItem(key) {
    await SecureStore.deleteItemAsync(key);
}

export async function checkLogInStatus() {
    const value = await SecureStore.getItemAsync("LogInStatus");
    return value === null ? false : true;
}

export async function handleSignOut() {
    await SecureStore.deleteItemAsync("LogInStatus");
}