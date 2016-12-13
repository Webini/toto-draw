const winston       = require('winston');
const LOGGER_PREFIX = 'EventsHandler';

class EventsHandler {
  constructor(emitter) {
    this.emitter    = emitter;
    this.subscribed = {};
    this.pathes     = {};
    
    this.subscribedClosure  = (evt) => this.onSubscribe(evt);
    this.unsubscribeClosure = (evt) => this.onUnsubscribe(evt);
    this.disconnectClosure  = ()    => this.onDisconnect();

    this.emitter.on('subscribe',   this.subscribedClosure);
    this.emitter.on('unsubscribe', this.unsubscribeClosure);
    this.emitter.on('disconnect',  this.disconnectClosure);
  }

  onSubscribe(evt) {
    if (!this.subscribed[evt.id]) {
      this.subscribed[evt.id] = (newEvt) => this.onMessage(evt.id, newEvt);
      this.emitter.on(evt.id, this.subscribed[evt.id]);
    } else {
      winston.info(LOGGER_PREFIX, 'Trying to re subscribe from channel ${evt.id}');
    }
  }

  onUnsubscribe(evt) {
    if (this.subscribed[evt.id]) {
      this.emitter.off(evt.id);
      delete this.subscribed[evt.id];
    } else {
      winston.info(LOGGER_PREFIX, 'Trying to unsubscribe from channel ${evt.id}');
    }
  }

  onMessage(id, evt) {
    
  }

  //<circular referencies paranoia>
  onDisconnect() {
    //unsubscribe from all events
    for (const id in this.subscribed) {
      this.onUnsubscribe({ id });
    }

    this.emitter.off(this.subscribedClosure);
    this.emitter.off(this.unsubscribeClosure);
    this.emitter.off(this.disconnectClosure);
    this.emitter = null;
  }
  //</circular referencies paranoia>
}

module.exports = EventsHandler;