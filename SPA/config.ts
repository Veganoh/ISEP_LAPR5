import { HttpHeaders } from "@angular/common/http";

export default {
    logistica_url: "http://localhost:3000",

    gestao_armazens_url: "https://localhost:5001",

    google_client_id: "564915164450-16lj57fujl12a5sk4u1fejd0hj2mki00.apps.googleusercontent.com",

}

export const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
    'Authorization': `Bearer ${getCookie('jwtToken')}` })
};

export function getCookie(name: string) {
    let dc = document.cookie;
    let prefix = name + "=";
    let begin = dc.indexOf("; " + prefix);
    let end;

    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
        end = document.cookie.indexOf(";", begin);
        
        if (end == -1) 
          end = dc.length;
    }

    return decodeURI(dc.substring(begin + prefix.length, end));
}