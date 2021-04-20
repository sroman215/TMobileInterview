import {expect} from 'chai'
import {CheckWriterService } from '../api/Services/checkWriterService';

describe.only('Check Writer Service Tests', () => {
    const service: CheckWriterService = new CheckWriterService();

    describe('tests for happy path', () => {
        it('works for 07 input should output Seven dollars only', () => {
            expect(service.wholeNumberRound(7)).equals('Seven dollars only')
        })
        it('works for 10 input should output ', () => {
            expect(service.wholeNumberRound(10)).equals('Ten dollars only')
        })
        it('works for 59 input', () => {
            expect(service.wholeNumberRound(59)).equals('Fifty nine dollars only')
        })
        it('works for 14 input', () => {
            expect(service.wholeNumberRound(14)).equals('Fourteen dollars only')
        })
        it('works for decimal input', () => {
            expect(service.wholeNumberRound(5.07)).equals('Five dollars and 07/100')
        })
        it('works for 90.75 decimal input', () => {
            expect(service.wholeNumberRound(90.75)).equals('Ninety dollars and 75/100')
        })
    })


    describe('test that should throw', () => {
        it('works for negative input should output Error', () => {
            expect(() => service.wholeNumberRound(-5)).to.throw()
        })
    })

})