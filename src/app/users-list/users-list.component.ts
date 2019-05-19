import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GitHubService } from '../github.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
 items=[];

 totalcount = 0;
 sortingoption = [ 'sortbyName', 'ReverseSortbyName','SortByRank', 'ReverseSortByRank' ] 
  constructor(private _githubService:GitHubService){}
 
  defaultSearch  = 'Varun'

copyitems=[];

   @ViewChild('SortingOption') SortingOption: ElementRef;
  

objs = [ 
    { first_nom: 'Lazslo', last_nom: 'Jamf'     },
    { first_nom: 'Pig',    last_nom: 'Bodine'   },
    { first_nom: 'Pirate', last_nom: 'Prentice' }
];

  
 ngOnInit()
  { 
     this.getUserList(this.defaultSearch);   
  }
  
  //  sortWithName(nameSearch)
  // {
    
  //      this.items = []; 
  //      this.copyitems.filter(item => { 
  //           console.log(item.login.toLowerCase().includes(nameSearch));
         
  //           if(item.login.toLowerCase().includes(nameSearch))
  //           {
  //             this.items.push(item);
  //           }  
  //       }) 
  //     console.log(this.items);
  // }


  sortWithName(nameSearch)
  {
    this.getUserList(nameSearch);
  }

  search()
  {
    console.log(this.SortingOption.nativeElement.value); 
    
    if(this.SortingOption.nativeElement.value == 'sortbyName')
    { 
      this.items = this.copyitems.sort(this.sortbyname); 
      console.log(this.items);  
     }
     if(this.SortingOption.nativeElement.value == 'ReverseSortbyName')
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
  
  onNewRecipe()
  {
    console.log('Here');
  }
  getUserList(name)
  {
   this._githubService.getUsersList(name)
    .subscribe((data:any) => {
      this.totalcount = data.total_count;
      this.items = data.items;  
      this.copyitems = data.items;  
       
       // lower casing 
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
