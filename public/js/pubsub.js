/**
* @name PubSub
* @summary Simple ES6 based PubSub implementation with JavaScript - adopted from Addy Osmani's design patterns book.
*/
class PubSub {
  constructor() {
    this.topics = {};
    this.subUid = -1;
  }

  /**
   * @name subscribe
   * @description subscribe to a channel message
   * @param {string} topic
   * @param {function} func
   * @return {string} subscribe token
   */
  subscribe(topic, func) {
    if (!this.topics[topic]) {
      this.topics[topic] = [];
    }
    let token = (++this.subUid).toString();
    this.topics[topic].push({
      token,
      func
    });
    return token;
  }

  /**
   * @name publish
   * @description publish a message to a channel topic
   * @param {string} topic
   * @param {object} args
   * @retunn {boolean} true if topic exists
   */
  publish(topic, args) {
    if (!this.topics[topic]) {
      return false;
    }
    setTimeout(() => {
      let subscribers = this.topics[topic];
      let len = subscribers ? subscribers.length : 0;
      while (len--) {
        subscribers[len].func(topic, args);
      }
    }, 0);
    return true;
  }

  /**
   * @name unsubscribe
   * @default unsubscribe to a channel topic
   * @param {string} token
   * @return {string | false} token that was unsubscribed or false if topic not found
   */
  unsubscribe(token) {
    for (let m in this.topics) {
      if (this.topics[m]) {
        for (let i = 0, j = this.topics[m].length; i < j; i++) {
          if (this.topics[m][i].token === token) {
            this.topics[m].splice(i, 1);
            return token;
          }
        }
      }
    }
    return false;
  }
}

