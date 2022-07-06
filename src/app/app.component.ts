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
  public investAmount: number = 0;
  public totalAmount: number = 500000;
 
  
  constructor(private loansService: LoansService){ }

  ngOnInit(): void {
    this.loansService.getLoans().subscribe((data:any) => {
        this.loansList = [
          new Loan(data.loans[0], ""),
          new Loan(data.loans[1], ""),
          new Loan(data.loans[2], "")
        ]
        console.log(this.loansList);
    });
  }

  onSelect(loan: Loan){
    this.selectedLoan = loan;
  }

  closeElem(){
    this.investAmount = 0;
    this.selectedLoan = null;
  }

  onInvest(inputVal:number, summary: number, availableVal: any, chosenLoan: Loan | null){
    if(inputVal > 0 && !isNaN(inputVal) && chosenLoan !== null){
      if(this.totalAmount > inputVal && Number(availableVal.split(',').join('')) >= inputVal){
        summary = summary - inputVal;
        this.totalAmount = summary;
        availableVal = Number(availableVal.split(',').join('')) - inputVal;
        chosenLoan.properties.available = String(availableVal);
        chosenLoan.investIndicator = "invested";
        this.closeElem();
      }
    } 
  }
}
