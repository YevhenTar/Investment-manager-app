import { Component } from '@angular/core';
import { LoansService } from './loans.service';
import { Loan } from './loan';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public loansList: Loan[] = [];
  public selectedLoan: Loan | null = null;
  
  constructor(private loansService: LoansService){ }

  ngOnInit(): void {
    this.loansService.getLoans().subscribe((data:any) => {
        this.loansList = [
          new Loan(data.loans[0]),
          new Loan(data.loans[1]),
          new Loan(data.loans[2])
        ]
        console.log(this.loansList);
    });
  }

  onSelect(loan: Loan){
    this.selectedLoan = loan;
  }

  closeElem(){
    this.selectedLoan = null;
  }
}
