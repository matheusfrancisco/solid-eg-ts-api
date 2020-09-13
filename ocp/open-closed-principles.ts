


 // ============> Without the Open-Closed Principle
 class PurchaseBad {
	createPurchaseWithMasterCard(): void {
		// Handle purchase with Master Card
	}

	createPurchaseWithVisa(): void {
		// Handle purchase with Visa
	}
}



// ============> Implementing the Open-Closed Principle
abstract class Purchase {
	abstract createPurchase(): void;
}

// Now the Purchase class can be extensible to multiple payment methods
// And those payment methods are extensible in their own class
class VisaPayment extends Purchase {
	createPurchase(): void {
		// do something
	}
}

class MasterCardPayment extends Purchase {
	createPurchase(): void {
		// do something
	}
}