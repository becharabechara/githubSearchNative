export const setLocalStorageRepos = (props) =>{
    window.localStorage.setItem("repositories",JSON.stringify(props));
}
export const getLocalStorageRepos = ()=>{
    return JSON.parse(window.localStorage.getItem("repositories"));
}