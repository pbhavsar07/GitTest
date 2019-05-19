import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";


@Injectable()
export class GitHubService {

    constructor(private http: HttpClient){}

  
    getUsersList(username)
    {
     //   ttps : //api.github.com/search/users?q={search-string}
  
     return this.http.get(`https://api.github.com/search/users?q=${username}`);
    }

    async getUserDetails(username)
    {
        return await this.http.get(`https://api.github.com/users/${username}/repos`).toPromise();
    }

}