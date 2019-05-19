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

  more()
 {
  this.moreVar = true;
  }
   
  /*
  /Additionally from each repository, 
  you can show  ; name of repo  - name
open issues count,  - open_issues_count 
stars,   - stargazers_count
followers (watchers),  - watchers_count
fork count etc. - forks_count
 
  **/
 
   fetchmoreDetails(username)
  {  
    this.check1 = true;
    this._githubService.getUserDetails(username)
    .then(data => {
      console.log("DATA: ",data);
      this.userDetails = data ;
    })  
  }
  clear()
  {
    this.showdetails = false;
    this.repoItem = {};
  }
  getMoreData(repoitem)
  { 
    console.log(repoitem);
    this.repoItem = repoitem;
    this.showdetails = true;
  }
  dropdown()
  {
    //  this.userDetails=[];
     this.moreVar = false;

  }

  getUserDetails(value)
  {   
       this._githubService.getUserDetails(value)
      .then(data => {
        console.log("DATA: ",data);
        this.userDetails = data ;
      })  
   
      console.log(this.userDetails);
  }

  open()
  {
    document.getElementById('m_maxlength_modal').style.display = 'block';
    document.getElementById('m_maxlength_modal').classList.add('show');

    document.querySelector('#close').addEventListener('click', function() {
        document.getElementById('m_maxlength_modal').classList.remove('show');
        document.getElementById('m_maxlength_modal').style.display = 'none';
    });
    //redundant : need to correct
    document.querySelector('#close-button').addEventListener('click', function() {
        document.getElementById('m_maxlength_modal').classList.remove('show');
        document.getElementById('m_maxlength_modal').style.display = 'none';
    });
  }

}
