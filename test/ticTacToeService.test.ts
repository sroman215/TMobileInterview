import {expect} from 'chai'
import { TicTacToeService } from '../api/Services/tictactoeService';

describe('TicTacToeService', () => {
  let service: TicTacToeService;
  
  beforeEach(() => service = new TicTacToeService())

  describe('board tests', () => {
    it('initialization properly sets board', () => {
      expect(service.board).lengthOf(3)
      for (const row of service.board) {
        expect(row).lengthOf(3)
        row.forEach(el => expect(el).equals('-'));
      }
    })

    it('should work for setting a valid single piece', () => {
      const userPiece = service.personMap.get(0);
      const game = service.placeMove(0, 0, 0);
      expect(game.board[0][0]).equals(userPiece)
    })

    it('should throw if place move twice in same space by 2 players', () => {
      service.placeMove(0, 0, 0)
      expect(() => service.placeMove(1, 0, 0)).to.throw();
    })

    it('should throw if someone tries to go twice in a row', () => {
      service.placeMove(0, 0, 0)
      expect(() => service.placeMove(0, 1, 1)).to.throw();
    })

    it('should throw if placing a move out of bounds', () => {
      expect(() => service.placeMove(0, -1, 0)).to.throw();
      expect(() => service.placeMove(0, 0, -2)).to.throw();
      expect(() => service.placeMove(0, 4, 0)).to.throw();
      expect(() => service.placeMove(0, 0, 5)).to.throw();
    })

    it('should throw if placing for an unknown user', () => {
      expect(() => service.placeMove(2, 0, 0)).to.throw();
      expect(() => service.placeMove(-1, 0, 0)).to.throw();
    })
  })

  describe('winner tests', () => {
    describe('horizontal win tests', () => {
      it ('full row should win', () => {
        service.board = [['O','O','O'], ['-','-','-'], ['-','-','-']]
        expect(service.checkForWinner()).to.be.true
      })
      it ('non-full row should not win', () => {
        service.board = [['X','O','O'], ['-','-','-'], ['-','-','-']]
        expect(service.checkForWinner()).to.be.false
      })
    })

    describe('vertical win tests', () => {
      it ('full row should win', () => {
        service.board = [['O','-','-'], ['O','-','-'], ['O','-','-']]
        expect(service.checkForWinner()).to.be.true
      })
      it ('non-full row should not win', () => {
        service.board = [['X','-','-'], ['O','-','-'], ['O','-','-']]
        expect(service.checkForWinner()).to.be.false
      })
    })

    describe('diagonal win tests', () => {
      it ('full row should win', () => {
        service.board = [['O','-','-'], ['-','O','-'], ['-','-','O']]
        expect(service.checkForWinner()).to.be.true
      })
      it ('non-full row should not win', () => {
        service.board = [['O','-','-'], ['-','O','-'], ['-','-','X']]
        expect(service.checkForWinner()).to.be.false
      })
    })
  
    it('check winner works for specific players', () => {
      service.board = [['O','-','-'], ['-','O','-'], ['-','-','O']]
      expect(service.checkForWinner(0)).to.be.false
    })
  })

});