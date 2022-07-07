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
        this.loansList = data.loans.map((loan: any): Loan => new Loan(loan, false));
        console.log(this.loansList);
    });
  }

  onSelect(loan: Loan){
    this.selectedLoan = loan;
  }
  getPeriod(currentDate: any){
    return `${Math.round(currentDate/86400)} days`;
  }

  closeElem(){
    this.investAmount = 0;
    this.selectedLoan = null;
  }

  onInvest(inputVal:number, chosenLoan: Loan | null){
    if(inputVal > 0 && !isNaN(inputVal) && chosenLoan !== null){
      if(this.totalAmount > inputVal && Number(chosenLoan.properties.available.replace(',','')) >= inputVal){
        this.totalAmount = this.totalAmount - inputVal;
        const availableVal = chosenLoan.properties.available.replace(',','') - inputVal;
        chosenLoan.properties.available = String(availableVal);
        chosenLoan.investIndicator = true;
        this.closeElem();
      }
    }
  }
}
