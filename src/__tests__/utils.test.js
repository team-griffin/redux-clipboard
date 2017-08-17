import {expect} from 'chai';
import sinon from 'sinon';
import * as utils from '../utils';

describe('utils', function(){
  describe('copyContent', function(){
    beforeEach(function(){
      const element = {
        style: {},
        select: sinon.spy(),
      };
      const document = {
        createElement : sinon.stub().returns(element),
        execCommand : sinon.stub(),
        body: {
          appendChild: sinon.spy(),
          removeChild : sinon.spy(),
        },
      };

      this.element = element;
      this.document = document;
    });


    it('should create an element', function(){
      const {document, element} = this;
      utils.copyContent(document, {});
      expect(document.createElement.called).to.be.true;
    });
    it('should hide the element', function(){
      const {document, element} = this;
      utils.copyContent(document, {});
      expect(element.style.position).to.equal('fixed');
    });
    it('append the element to the document', function(){
      const {document, element} = this;
      utils.copyContent(document, {});
      expect(document.body.appendChild.called).to.be.true;
      expect(document.body.appendChild.calledWith(element)).to.be.true;
    });
    it('should select the element', function(){
      const {document, element} = this;
      utils.copyContent(document, {});
      expect(element.select.called).to.be.true;
    });
    it('should remove the element', function(){
      const {document, element} = this;
      utils.copyContent(document, {});
      expect(document.body.removeChild.called).to.be.true;
      expect(document.body.removeChild.calledWith(element)).to.be.true;
    });
    it('should return true if copy suceeded', function(){
      const {document, element} = this;
      const result = utils.copyContent(document, {});
      expect(result).to.be.true;
    });
    it('should return false if copy failed', function(){
      const {document, element} = this;
      document.execCommand.throws(new Error());
      const result = utils.copyContent(document, {});
      expect(result).to.be.false;
    });

  });

});
