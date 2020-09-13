
// Exemplo de substituição de Liskov - A capacidade de substituir qualquer instância de uma classe pai por
// uma instância de uma de suas classes filho sem efeitos colaterais negativos. 
// Declara a classe com a responsabilidade de preparar uma salada a partir de alguns ingredientes.
interface ISaladService {
  prepareSalad(ingredients: string[]): string;
}

// Implementar a interface acima com alguma funcionalidade sobre como preparar uma salada.
export class LeafySaladService implements ISaladService {
  prepareSalad(ingredients: string[]): string {
      return `Leafy salad made of ${ingredients.join(", ")}`;
  }
}


// Cria uma classe chef com dependência do ISaladService, independentemente se é uma salada de "folhas" ou não
export class ChefController {
  private _saladService: ISaladService;
  constructor(saladService: ISaladService) {
      this._saladService = saladService;
  }
  public createSalad(ingredients: string[]): void {
      console.log(this._saladService.prepareSalad(ingredients));
  }
}

// Agora crie uma instância do chef e peça-lhe que faça uma salada de "folhas".
let chefController = new ChefController(new LeafySaladService());
chefController.createSalad(["lettuce, tomatoes, cucumber"]); //OUTPUT = Leafy salad made of lettuce, tomatoes, cucumber


// O princípio de substituição de Liskov nos permite substituir a salada de folhas por outra implementação, neste caso, uma salada de frutas. 
// Isso tudo está no acordo de que tem o mesmo tipo de base.
export class FruitSaladService implements ISaladService {
  prepareSalad(ingredients: string[]): string {
      return `Fruit salad made of ${ingredients.join(", ")}`;
  }
}

// Seguindo o princípio de substituição de Liskovs, agora podemos usar o FruitSaladService em vez do LeafySaladService. 
// O bom é que, por seguir o LSP, não precisamos nos preocupar com o código ChefController sendo afetado por essa mudança.
chefController = new ChefController(new FruitSaladService());
chefController.createSalad(["mango, pinapple, bannana"]); //OUTPUT = Fruit salad made of mango, pinapple, bannana