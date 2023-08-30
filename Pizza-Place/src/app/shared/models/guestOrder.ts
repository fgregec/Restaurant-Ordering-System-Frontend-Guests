export class Ingredient{
    constructor(
        public id: string,
        public name: string
    ) {}
}

export class MenuItem{
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public icon: string
    ) {}
}

export class OrderMenuItem{
    constructor(
        public id: string,
        public menuItemId: string,
        public guestOrderId: string,
        public quantity: number
    ) {}
}

export class GuestOrder{
    constructor(
        public id: string,
        public guestId: string,
        public placedAt: Date
    ) {}
}