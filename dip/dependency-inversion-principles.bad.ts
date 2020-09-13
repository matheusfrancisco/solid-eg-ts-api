
// Exemplo - Ruim 
// Isso é ruim devido ao módulo de alto nível (StoreBad) ser dependente de módulos de baixo nível (PayPalBad, GooglePayBad). 
// A abordagem correta é usar abstrações...

class StoreBad {
  paypal: PayPalBad
  user: string
  googlePay: GooglePayBad
  
  constructor(user) {
      this.paypal = new PayPalBad(user)
      this.user = user
      this.googlePay = new GooglePayBad()
  }

  purchaseItem(item: string, amount: number) {
      this.paypal.makePayment(item, amount * 100)
      this.googlePay.makePayment(this.user, item, amount)
  }
}

class PayPalBad {
  user: string
  
  constructor(user) {
      this.user = user
  }

  makePayment(item, amountInPennies) {
      console.log(`${this.user} bought ${item} for £${amountInPennies /100} with PayPal`)
  }
}

class GooglePayBad {
  makePayment(user, item, amountInPounds) {
      console.log(`${user} bought ${item} for £${amountInPounds} with GooglePay`)
  }
}

const storeBad = new StoreBad("Dave");
storeBad.purchaseItem("facemask", 5);