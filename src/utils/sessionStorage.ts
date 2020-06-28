export const getToken:GetTokenType = () =>{
    let token = sessionStorage.getItem('Authorization');
    if (token) {
        return token.split(' ')[1];
    }
    return undefined
}

export type GetTokenType = () => string | undefined