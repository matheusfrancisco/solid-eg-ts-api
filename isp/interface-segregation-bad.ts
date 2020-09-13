//Example = Bad
//An interface should not be a description of an entire class. An interface should only cover one behaviour.
//Simple ovens wouldn't have a built in microwave or self cleaning function so it shouldn't be in the interface.
interface OvenBad {
  heatOven(temperature: number);
  runMircowave(duration: number, defrost: boolean);
  runClean();
}

class SimplePrinterBad implements OvenBad {
  heatOven(temperature: number) {
      //...
  }
  runMircowave(duration: number, defrost: boolean) {
      //...
  }
  runClean() {
      //...
  }
}