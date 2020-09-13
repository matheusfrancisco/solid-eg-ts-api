
//Example - Good


// Usa abstração (PayPalPaymentProcessor & GooglePayPaymentProcessor) para garantir módulos de alto nível (StoreGood)
// não dependem dos módulos de baixo nível (PayPal, GooglePay)
// A loja só tem um contrato com o processador de pagamento e não com o Implementação do PayPal ou GooglePays ou possíveis alterações futuras.
export class Store {
  paymentProcessor: PaymentProcessor  
  constructor(paymentProcessor) {
      this.paymentProcessor = paymentProcessor
  }

  purchaseItem(item: string, amount: number) {
      this.paymentProcessor.pay(item, amount)
  }
}

interface PaymentProcessor {
  pay(item: string, amount: number): void;
}

// PayPalPaymentProcessor implementa a interface PaymentProcessor e define sua implementação de pagamento específica
// chamando o PayPal com o que é necessário para fazer um pagamento, no caso do PayPal, um item e valor em centavos
export class PayPalPaymentProcessor implements PaymentProcessor {
  paypal: PayPal
  constructor(user) {
      this.paypal = new PayPal(user)
  }

  pay(item, amountInPounds) {
      this.paypal.makePayment(item, amountInPounds * 100)
  }
}

// GooglePayPaymentProcessor implementa a interface PaymentProcessor e a define implementação de pagamento específica 
// chamando GooglePay com o que é necessário para fazer um pagamento, neste caso um usuário, um item e um valor em libras
export class GooglePayPaymentProcessor implements PaymentProcessor {
  googlePay: GooglePay
  user: string
  constructor(user) {
      this.googlePay = new GooglePay()
      this.user = user
  }

  pay(item, amountInPounds) {
      this.googlePay.makePayment(this.user, item, amountInPounds)
  }
}
/// PayPal tem sua própria implementação de fazer pagamento
class PayPal {
  user: string
  
  constructor(user) {
      this.user = user
  }

  makePayment(item, amountInPennies) {
      console.log(`${this.user} bought ${item} for £${amountInPennies /100} with PayPal`)
  }
}

// GooglePay tem sua própria implementação de fazer pagamento
class GooglePay {
  makePayment(user, item, amountInPounds) {
      console.log(`${user} bought ${item} for £${amountInPounds} with GooglePay`)
  }
}

// A loja agora pode receber um PayPalPaymentProccessor ou GooglePayPaymentProcessor 
// A loja não precisa se preocupar com a forma como o pagamento é processado.
const store = new Store(new PayPalPaymentProcessor("Dave"));
store.purchaseItem("facemask", 5); 

// const store = new Store(new GooglePayPaymentProcessor("Dave"));
// store.purchaseItem("facemask", 5); 
