import { EmployeeSR, Payroll } from './srp-good';
import { Payment } from './srp-good';

describe('EmployeeSR', () => {
    it('employee should be an instance of employeeSR with defined properties', async () => {
        //Arrange
        let employee: EmployeeSR = new EmployeeSR("test", 10, 10, 10);

        //Assert
        expect(employee).toBeInstanceOf(EmployeeSR);
        expect(employee.name).toBe("test");
        expect(employee.payPerHour).toBe(10);
        expect(employee.pensionContribution).toBe(10);
        expect(employee.tax).toBe(10);
    });
});

describe('Payment', () => {
    let employee: EmployeeSR;

    beforeEach(() => {
        employee = new EmployeeSR("test", 10, 10, 10);
    });

    it('payment constructor should create a calculated net payment', async () => {
        //Arrange
        let payment: Payment = new Payment(employee, 37);

        //Assert
        expect(payment.netPay).toBe(296);
    });

    it('calculate gross pay as pay per hour * hours worked', async () => {
        //Arrange
        let payment: Payment = new Payment(employee, 37);

        //Act
        let grossPay: number = payment.calculateGrossPayment();

        //Assert
        expect(grossPay).toBe(370);
    });

    it('calculate pension payment as gross pay / pension contribution', async () => {
        //Arrange
        let payment: Payment = new Payment(employee, 37);
        let grossPay: number = payment.calculateGrossPayment();

        //Act
        let pensionPayment = payment.calculatePensionPayment(grossPay);

        //Assert
        expect(pensionPayment).toBe(37);
    });

    it('calculate tax payment as gross pay / tax contribution', async () => {
        //Arrange
        let payment: Payment = new Payment(employee, 37);
        let grossPay: number = payment.calculateGrossPayment();

        //Act
        let taxPayment = payment.calculateTaxPayment(grossPay);

        //Assert
        expect(taxPayment).toBe(37);
    });
});

describe('Payroll', () => {
    let employee: EmployeeSR;
    let payment: Payment;

    beforeEach(() => {
        employee = new EmployeeSR("test", 10, 10, 10);
        payment = new Payment(employee, 37);
    });

    it('should have an employee name and calculated net payment', async () => {
        //Arrange
        let payroll: Payroll = new Payroll(employee, payment);

        //Assert
        expect(payroll.employee.name).toBe("test");
        expect(payroll.payment.netPay).toBe(296);
    });

    it('payEmployee should log out name and net payment', async () => {
        //Arrange
        let payroll: Payroll = new Payroll(employee, payment);
        //Mock
        console.log = jest.fn();

        //Act
        payroll.payEmployee();

        //Assert
        expect(console.log).toHaveBeenCalledWith("test's net payment was R$296 send payslip");
    });
});