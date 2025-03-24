export class Product{

    constructor(
        public id: number = 0,
        public title: string = '',
        public price: number = 0,
        public type: string = '',
        public selected: boolean= false
      ) {}
    
}