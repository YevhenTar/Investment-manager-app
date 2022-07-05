import { Component } from '@angular/core';
import { LoansService } from './loans.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public loansList:any = {};
  
  constructor(private loansService: LoansService){ }

  ngOnInit(): void {
    this.loansService.getLoans().subscribe((data:any) => {
        this.loansList = data.loans;
        console.log(this.loansList);
    });
  }
}
