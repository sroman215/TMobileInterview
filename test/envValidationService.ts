import {expect} from 'chai'
import {EnvValidationService } from '../api/Services/envValidationService';

describe('Environment Validation Service Tests', () => {
    const service: EnvValidationService = new EnvValidationService();

    it('works for simple string', () => {
        expect(service.convertToUpper('Hello World!')).equals('HELLO WORLD!')
    })
})