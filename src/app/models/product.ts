export class Product{

    constructor(
        public id: number = 0,
        public title: string = '',
        public price: number = 0,
        public type: string = '',
        public selected: boolean= false
      ) {}
    // id: number;
    // title: string;
    // price: number;
    // type: string;
    // selected: boolean;

    // constructor(id: number, title: string, price: number, type: string){
    //     this.id = id;
    //     this.title = title;
    //     this.price = price;
    //     this.type = type;
    //     this.selected = false
    // }

    // static fromJson(jsonData: any){
    //     const product = new Product(jsonData["id"], jsonData["title"], jsonData["price"], jsonData["type"])
    //     return product
    // }

    // toJson(): any{
    //     return {
    //         id: this.id,
    //         title: this.title,
    //         price: this.price,
    //         type: this.type,
    //         selected: this.selected
    //     }
    // }
}