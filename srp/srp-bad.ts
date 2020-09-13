// SRP

//Example - Bad
class Employee {
  name: string;
  payPerHour: number;
  pensionContribution: number;
  tax: number;

  constructor(name: string, payPerHour: number, pensionContribution: number, tax: number) {
      this.name = name;
      this.payPerHour = payPerHour;
      this.pensionContribution = pensionContribution;
      this.tax = tax;
  }

  payEmployee(hoursWorked: number): void {
      let grossPay: number = this.payPerHour * hoursWorked;
      let netPay: number = grossPay - (grossPay / this.pensionContribution) - (grossPay / this.tax);
      
      console.log(this.name + "'s net payment was £" + netPay + " send payslip");
  }
}

//Example - Bad
const dave = new Employee("Dave", 10, 10, 10);
dave.payEmployee(37);



//--------------------------------------------------------///