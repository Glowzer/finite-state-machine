class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
      if (config !== undefined) {
          this.config = config;
          this.initial = config.initial;
          this.state = config.initial;
          this.stateArray = [];
          this.redoArray = [];
      }
      else { throw new Error(); }
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
      if(state != 'normal' && state != 'sleeping' && state != 'hungry' && state != 'busy')
          throw new Error();
      this.stateArray.push(this.state);
      this.redoArray.pop();
      this.state = state;
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
      if(event != 'get_tired' && event != 'get_hungry' && event != 'get_up' && event != 'eat' && event != 'study' || this.config.states[this.state].transitions[event] == undefined)
        throw new Error();
      this.stateArray.push(this.state);
      this.redoArray.pop();
      this.state = this.config.states[this.state].transitions[event];
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
      this.stateArray.push(this.state);
      this.state = this.config.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
      if(event === undefined)
        return ['normal', 'busy', 'hungry', 'sleeping'];
      var array = [];
      for (var key in this.config.states){
          if (event in this.config.stateArray[key].transitions)
            array.push(key);
      }
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
        this.state = this.config.initial;
        this.stateArray.length = this.redoArray.length = 0;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
