class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
      this.config = config;
      this.initial = config.initial;
      this.state = config.initial;
      this.stateArray = [];
      this.redoArray = [];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
      return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
      this.state = state;
      this.stateArray.push(this.state);
      this.redoArray.pop();
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
      this.stateArray.push(this.state);
      this.redoArray.pop();
      this.state = this.config.states[this.state].transition[event];
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
      this.state = this.initial;
      this.stateArray.push(this.state);
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
      if(event === undefined)
        return ['sleeping','normal','hungry','busy'];
      var array = [];
      for(var k in this.config.states)
          if(event in this.config.states[k].transition)
            array.push(k);
      return array;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
      if (this.stateArray.length == 0)
            return false;
        this.redoArray.push(this.state);
        this.state = this.stateArray.pop();
        return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
      if (this.redoArray == 0)
           return false;
       this.stateArray.push(this.state);
       this.state = this.redoArray.pop();
       return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.state = this.initial;
        this.stateArray.length = 0;
        this.redoArray.length = 0;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
