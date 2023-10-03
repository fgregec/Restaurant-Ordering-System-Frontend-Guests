export class Ingredient{
    constructor(
        public id: string,
        public name: string
    ) {}
}

export class MenuItem{
    constructor(
        public id?: string,
        public name?: string,
        public description?: string,
        public icon?: string,
        public price?: number,
        public removedIngredients?: Ingredient[],
        public quantity?: number,
        public menuItem?: MenuItem[]
    ) {}
}

export class OrderMenuItem{
    constructor(
        public id?: string,
        public menuItemId?: string,
        public guestOrderId?: string,
        public quantity?: number,   
        public removedIngredients?: Ingredient[],
    ) {}
}

export class GuestOrder{
    constructor(
        public id: string,
        public guestId: string,
        public placedAt: Date,
        public PlacedFor: Date
    ) {}
}

export class AllOrdersDto{
    constructor(
        public orderId?: string,
        public menuItems?: MenuItem[],
        public placedAt?: string,
        public placedFor?: string,
        public numberOfPeople?: number,
        public orderStatus?: OrderStatus
    ) {}
}

export enum OrderStatus{
    BOOKED = '0',
    CANCELED = '1',
    SERVED = '2',
    IN_PROGRESS = '3'
}