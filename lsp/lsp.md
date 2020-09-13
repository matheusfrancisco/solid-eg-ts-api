# Liskov Substitution Priciple

Let O(x) be a property provable about objects x of type T
Then O(y) should be true for objects y of type S where S is a subtype of T.

WHAAAAAAAAT???

X é um obejto da class T e y é um objeto da class S.
A class S é uma subClass de T ou seja (herda de T).
Então x tem um metodo. x.walk()
Então se eu substituir o objeto x por um y então o programa deve continuar funcionando...


Exemplo simples;

```typescript
class BaseClass {
  public sum(x:number, y:number) {
    return x+y
  }
}

class Subclass extends BaseClass {
  public sum(x:number, y:number) {
    return 2*x + 2*y;
  } 
}


function main(obj) {
  obj.sum(1,2)
}

const obj1 = new BaseClass()
const obj2 = new SubClass()

main(obj1)
main(obj2)
```

### Objetivo

Abstração forte, separar em interface ou abstrações fortes..
