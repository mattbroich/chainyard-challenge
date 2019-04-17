import React, { Component } from 'react';
import { Subject } from 'rxjs';
import { publishService } from './publishService.js';

export default class LatestBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      block: []
    };
  }

  componentDidMount() {
     fetch('/latestblock')
    .then(result => {
      return result.json();
    })
    .then(data => {
      this.setState({block: data});
      publishService.sendMessage({"topic": "Latest", "data": data.hash})
    })
  }

  render() {
    return (
      <div className="latest-block-container">
        <div id="latest-block-hash"><strong>Block Hash:</strong> {this.state.block.hash}</div>
        <div id="latest-block-time"><strong>Block Time:</strong> {this.state.block.time}</div>
        <div id="latest-block-index"><strong>Block Index:</strong> {this.state.block.block_index}</div>
        <div id="latest-block-height"><strong>Block Height:</strong> {this.state.block.height}</div>
        <div className="overflow-auto" id="latest-block-txIndexes"><strong>Block txIndexes:</strong> {this.state.block.txIndexes}</div>
      </div>
    )
  }

}
