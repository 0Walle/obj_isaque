const naipeNames = ["espadas", "copas", "paus", "ouro"];
const cardNames = ["Ás", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Valete", "Dama", "Rei"];

export class Deck {
    public size: number = 52;
    public useJokers: boolean = false;
    public inDeck: Array<Card> = [];
    public offDeck: Array<Card> = [];

    constructor(useJokers = false) {
        this.useJokers = useJokers;
        
        for (let naipe in naipeNames) {
            for (let card in cardNames) {
                this.inDeck.push(new Card(card, naipe));
            }
        }

        if (this.useJokers) {
            for (let i = 0; i < 2; i++) {
                this.inDeck.push(new Card("Coringa", ""));
            }
        }
        
        console.log("Baralho criado");
        this.shuffle();
    }

    listInDeck() {
        this.inDeck.map(item => console.log(item));
    }

    listOffDeck() {
        this.offDeck.map(item => console.log(item));
    }

    shuffle() {
        this.inDeck.sort(() => Math.random() - 0.5);
        console.log("Deck embaralhado");
    }
}

class Card {
    public value: string;
    public naipe: string;

    constructor(value: string, naipe: string) {
        this.value = value;
        this.naipe = naipe;
    }
} 