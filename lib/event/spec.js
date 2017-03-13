import { Event } from 'lib';

describe('Lib Event', () => {
  const testEventA = 'testA';
  const testEventAValue = 'testA';

  it('should be defined', () => {
    expect(Event).to.not.be.undefined;
  });

  it('should subscribe, trigger events and pass correct data', (done) => {
    let eventSpy = sinon.spy();
    Event.on(testEventA, eventSpy);
    Event.emit(testEventA, testEventAValue);

    setTimeout(() => {
      assert(eventSpy.calledOnce);
      assert(eventSpy.calledWith(testEventAValue));
      done();
    }, 0);
  });

  it('should handle multiple events', (done) => {
    let eventSpy = sinon.spy();
    Event.on(testEventA, eventSpy);
    Event.emit(testEventA, testEventAValue);

    setTimeout(() => {
      Event.emit(testEventA, testEventAValue);

      setTimeout(() => {
        assert(eventSpy.calledTwice);
        assert(eventSpy.calledWith(testEventAValue));
        done();
      }, 0);
    }, 0);
  });

  it('should be able to unsubscribe from the events', (done) => {
    let eventSpy = sinon.spy();
    Event.on(testEventA, eventSpy);
    Event.emit(testEventA, testEventAValue);

    setTimeout(() => {
      Event.off(testEventA);
      Event.emit(testEventA, testEventAValue);

      setTimeout(() => {
        assert(eventSpy.calledOnce);
        assert(eventSpy.calledWith(testEventAValue));
        done();
      }, 0);
    }, 0);
  });
});