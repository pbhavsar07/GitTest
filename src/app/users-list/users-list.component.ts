import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GitHubService } from '../github.service';


import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounce';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
 items=[];
 copyitems=[]; 
 totalcount = 0;
 sortingoption = [ 'sortbyName', 'ReverseSortbyName','SortByRank', 'ReverseSortByRank' ] 
 defaultSearch  = 'Varun'

 constructor(private _githubService:GitHubService){}
 
 @ViewChild('SortingOption') SortingOption: ElementRef;

 
 ngOnInit()
  { 
     this.getUserList(this.defaultSearch);   
  }
  
  // sort as you type.
  sortWithName(nameSearch)
  { 
    this.getUserList(nameSearch);
  }

// all the sorting functionalities.
  sorting()
  {
    console.log(this.SortingOption.nativeElement.value); 
    
    if(this.SortingOption.nativeElement.value == 'sortbyName')
    { 
      this.items = this.copyitems.sort(this.sortbyname); 
      console.log(this.items);  
     }
    else if(this.SortingOption.nativeElement.value == 'ReverseSortbyName')
     { 
       this.items = this.copyitems.sort(this.ReverseSortbyname); 
       console.log(this.items);  
      }

    else if(this.SortingOption.nativeElement.value == 'SortByRank')
    {
      this.items = this.copyitems.sort(this.sortByRank);
      console.log(this.items);
    } 
    
    else if(this.SortingOption.nativeElement.value == 'ReverseSortByRank')
    {
      this.items = this.copyitems.sort(this.ReverseSortByRank);
      console.log(this.items);
    } 
     
  }

  sortbyname(c1,c2)
  { 
    if(c1.login > c2.login) return 1
    else if( c1.login === c2.login) return 0
    else return -1 
  } 

  ReverseSortbyname(c1,c2)
  { 
    if(c1.login > c2.login) return -1
    else if( c1.login === c2.login) return 0
    else return 1 
  }

  sortByRank(c1,c2)
  {
   return c1.score - c2.score;
  }

  ReverseSortByRank(c1,c2)
  {
   return c2.score - c1.score;
  }
  
  
  // fetching all the list of users.
  getUserList(name)
  { 
   this._githubService.getUsersList(name)
    .debounceTime(200)
    .distinctUntilChanged()
   .subscribe((data:any) => {
      this.totalcount = data.total_count;
      this.items = data.items;  
      this.copyitems = data.items;  
       
       // lower casing - needed for sorting data alphabetically.
      for(var i=0;i<this.copyitems.length;i++){
         this.copyitems[i].login = this.copyitems[i].login.toLowerCase();
      }
    
      console.log('data: ',data); 
      console.log('items: ',this.items);
    },err => {
      console.log(err); 
    }) 
 }
}
