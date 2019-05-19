import { Component, OnInit, Input } from '@angular/core';
import { GitHubService } from '../../github.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-item',
  templateUrl: './users-item.component.html',
  styleUrls: ['./users-item.component.css']
})
export class UsersItemComponent implements OnInit {
  @Input() userlist; 
  @Input() index: number;
  userDetails;
  moreVar:boolean = false;
  check1 = false;
  constructor(private _router: Router,
    private _githubService: GitHubService) { }
    showdetails: boolean  = false; 
    repoItem;

  ngOnInit() {
  }

  // just a flag to display if there are more than 2 item.
  more()
  {
    this.moreVar = true;
  }

 // flag - to reduce number of records in the display.
 collapse()
  { 
     this.moreVar = false; 
  }

// Fetches all the repo of specific user name
   getRepositoryData(username)
  {  
    this.check1 = true;
    this._githubService.getUserDetails(username)
    .then(data => {
      console.log("DATA: ",data);
      this.userDetails = data ;
    })  
  }


// clears out repository data.
  clear()
  {
    this.showdetails = false;
    this.repoItem = {};
  } 

  // shows repository data - Repo Name,Open Issue,Star Count, Watch count etc.
  getMoreData(repoitem)
  { 
    console.log(repoitem);
    this.repoItem = repoitem;
    this.showdetails = true;
  }

  //redirects user to any profile page.
  gotoGithub(username)
  {
     window.open(`https://github.com/${username}`,'_blank');
  }
  // //
  // getUserDetails(value)
  // {   
  //      this._githubService.getUserDetails(value)
  //     .then(data => {
  //       console.log("DATA: ",data);
  //       this.userDetails = data ;
  //     })  
  //     console.log(this.userDetails);
  // }
  
}
