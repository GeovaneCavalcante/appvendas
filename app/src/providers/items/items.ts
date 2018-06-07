export class ItemsProvider {

  items: Array<any> = [];
  total = 0;
  
  constructor(){
    this.total = 0;
  }

  zera(){
    this.items = []
    this.total = 0
  }

  addItem(product){
    this.items.push(product);
    this.calculateTotal();
  }
  
  remove(item){
    this.total =  this.total - (item.valor*item.quantidade);
    var index = this.items.indexOf(item);
    this.items.splice(index, 1)
    this.calculateTotal()
  }

  calculateTotal(){
    let total = 0;
    this.items.forEach(product => {
       product['valor'] = product.valor * product.quantidade;
    })
    this.items.forEach(product => { total += Number(product.valor); this.total = total; });
  }
  
}
