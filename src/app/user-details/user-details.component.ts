import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GitHubService } from '../github.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  constructor(   private route: ActivatedRoute,

    private _githubService: GitHubService,
    private router: Router) { }
    userDetails;
    name;

  ngOnInit() { 
    this.route.params
      .subscribe(
        (params: Params) => {
          this.name = params['name']; 

          this._githubService.getUserDetails(this.name)
          .then(data => {
            console.log("DATA: ",data);
            this.userDetails = data ;
          })  
      });
  }

  check(name)
  {
    console.log(name);
  }

}
