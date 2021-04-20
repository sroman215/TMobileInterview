import { isInteger, lowerCase, startCase } from "lodash"

export class CheckWriterService {
    constructor() {}

    private digitToStringMap: Map<number, string> = new Map([
        [0, ''], // Will handle differently
        [1, 'one'],
        [2, 'two'],
        [3, 'three'],
        [4, 'four'],
        [5, 'five'],
        [6, 'six'],
        [7, 'seven'],
        [8, 'eight'],
        [9, 'nine'],
        [10, 'ten'],
        [11, 'eleven'],
        [12, 'twelve'],
        [13, 'thirteen'],
        [14, 'fourteen'],
        [15, 'fifteen'],
        [16, 'sixteen'],
        [17, 'seventeen'],
        [18, 'eightteen'],
        [19, 'nineteen'],
    ])

    private tensDigitToStringMap: Map<number, string> = new Map([
        [2, 'twenty'],
        [3, 'thirty'],
        [4, 'fourty'],
        [5, 'fifty'],
        [6, 'sixty'],
        [7, 'seventy'],
        [8, 'eighty'],
        [9, 'ninety'],
    ])

    public wholeNumberRound(num: number): string { 
        if (num < 0) {
            throw Error ('Cant process a negative number')
        }
        const parsedNums: Array<string> = this.returnNumberString(num) // Index 0 is the pre-decimal, index1 is post-decimal
        return `${parsedNums[0]} ${this.getCurrency()} ${parsedNums[1] === 'only' ? 'only' : `and ${parsedNums[1]}`}`;
    }

    private returnNumberString(num: number) : Array<string> {
        const splitNumForDecimal = num.toString().split('.').map(x => parseInt(x, 10))
        
        const returnVals = Array(2);
        returnVals[0] = this.handleIntegerValue(splitNumForDecimal[0]);
        returnVals[1] = splitNumForDecimal.length === 1 ? 'only' : this.getCents(splitNumForDecimal[1])
        
        return returnVals
    }

    private handleIntegerValue(num: number): string {
        if (num < 20) {
            return startCase(this.digitToStringMap.get(num));
        }


        const numAsString = num.toString();
        const numElements = numAsString.length;
        
        if (numElements === 1) {
            return startCase(this.digitToStringMap.get(num));
        }
        
        const digits = [parseInt(numAsString[0]), parseInt(numAsString[1])];
        return `${startCase(this.tensDigitToStringMap.get(digits[0]))} ${lowerCase(this.digitToStringMap.get(digits[1]))}`.trim()
    }

    private getCurrency(): string {
        return 'dollars'
    }

    private getCents(num: number): string {
        return !num ? 'only' : `${num < 10 ? `0${num}`: num}/100`
    }
}