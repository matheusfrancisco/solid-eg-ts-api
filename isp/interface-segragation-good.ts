//Example - Good
// Interface Segregation é sobre a criação de uma série de interfaces menores e mais específicas que são implementadas pela classe.
// Cada interface deve fornecer um único comportamento.
interface Oven {
    heatOven(temperature: number);
}

interface Microwave {
    runMircowave(duration: number, defrost: boolean);
}

interface SelfClean {
    runClean();
}

// Precisa apenas implementar a interface que é específica para o comportamento que requer.
export class SimpleOven implements Oven {
    heatOven(temperature: number) {
        console.log(`Oven heating to ${temperature}°C`);
    }
}

// Melhor ter vários interfaces do que uma interface sobrecarregada. 
// Como você pode ver, o SimpleOven precisava apenas de uma interface Oven, mas este MegaOven pode ter o comportamento de Oven, Microwave, SelfClean
export class MegaOven implements Oven, Microwave, SelfClean {
    heatOven(temperature: number) {
        console.log(`Oven heating to ${temperature}°C`);
    }
    runMircowave(duration: number, defrost: boolean) {
        if(defrost){
            console.log(`Defrosting for ${duration} seconds`);
        } else {
            console.log(`Heating for ${duration} seconds`);
        }
    }
    runClean() {
        console.log(`Starting cleaning cycle`);
    }
}

const simpleOven = new SimpleOven;
simpleOven.heatOven(160); // forno aquecido to 160°C
const megaOven = new MegaOven;
megaOven.heatOven(180); // forno aquecido to 180°C
megaOven.runMircowave(60,false); // Heating for 60 seconds
megaOven.runMircowave(480,true); // Defrosting for 480 seconds
megaOven.runClean(); // Starting cleaning cycle