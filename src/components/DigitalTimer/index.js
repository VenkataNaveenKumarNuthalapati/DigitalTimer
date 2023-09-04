import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    limit: 25,
    min: 25,
    seconds: 0,
    isStart: false,
  }

  startTimer = () => {
    const {min, seconds} = this.state
    if (min === 0 && seconds === 0) {
      clearInterval(this.timerId)
      this.setState(preState => ({...preState, isStart: !preState.isStart}))
    } else {
      this.setState(preState => ({
        ...preState,
        min: preState.seconds === 0 ? preState.min - 1 : preState.min,
        seconds: preState.seconds === 0 ? 60 - 1 : preState.seconds - 1,
      }))
    }
  }

  startStop = () => {
    const {isStart} = this.state
    this.setState(preState => ({...preState, isStart: !preState.isStart}))
    if (!isStart) {
      this.timerId = setInterval(this.startTimer, 1000)
    } else {
      clearInterval(this.timerId)
    }
  }

  onDecrement = () => {
    const {isStart} = this.state
    if (!isStart) {
      this.setState(preState => ({
        ...preState,
        min: preState.limit - 1,
        limit: preState.limit - 1,
      }))
    }
  }

  onIncrement = () => {
    const {isStart} = this.state
    if (!isStart) {
      this.setState(preState => ({
        ...preState,
        min: preState.limit + 1,
        limit: preState.limit + 1,
      }))
    }
  }

  onReset = () => {
    clearInterval(this.timerId)
    this.setState({
      limit: 25,
      min: 25,
      seconds: 0,
      isStart: false,
    })
  }

  render() {
    const {min, seconds, isStart, limit} = this.state

    return (
      <div className="bg-container">
        <h1>Digital Timer</h1>
        <div className="main-container">
          <div className="timer-card">
            <div className="circle">
              <div>
                <h1 className="clock">
                  {min < 10 ? `0${min}` : min}:
                  {seconds < 10 ? `0${seconds}` : seconds}
                </h1>
                <p className="clock-text">{!isStart ? 'Paused' : 'Running'}</p>
              </div>
            </div>
          </div>

          <div className="buttons-card">
            <div className="buttons-container">
              <button
                type="button"
                className="button-image"
                onClick={this.startStop}
              >
                <img
                  className="icon"
                  src={
                    !isStart
                      ? 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                  }
                  alt={isStart ? 'pause icon' : 'play icon'}
                />
                <span>{!isStart ? 'Start' : 'Pause'}</span>
              </button>

              <button
                type="button"
                className="button-image"
                onClick={this.onReset}
              >
                <img
                  className="icon"
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                />
                <span>Reset</span>
              </button>
            </div>
            <p>Set Timer limit</p>
            <div className="limit-container">
              <button type="submit" onClick={this.onDecrement}>
                -
              </button>
              <p className="span"> {limit} </p>
              <button type="submit" onClick={this.onIncrement}>
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
