export interface Car {
    _id: string;
    model: string;
    type: string;
    year: number;
    hp: number;
    transmission: string;
    imageUrl: string;
    price: number;
    description: string;
    buyingList: [];
    owner: Object;
    // {
    //     "_id": "6731cb561814a623800eb963",
    //     "email": "gogo@abv.bg",
    //     "username": "Gogo",
    //     "password": "$2b$10$3KZOjf2EOSSOyBpDDjWRR.jsUB4n3hRVgqpnH0zPtV.0zzIyEvWg.",
    //     "__v": 0
    // },
}
