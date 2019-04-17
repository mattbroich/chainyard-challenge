import React, { Component } from 'react';
import { publishService } from './publishService.js';

export default class TransactionBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trans: []
    };
  }

  componentDidMount() {
    this.subscription = publishService.getMessage().subscribe(message => {
      if (message.text.topic === "Transaction") {
        fetch(`/transblock/${encodeURIComponent(message.text.data)}`)
        .then(result => {
          return result.json();
        }).then(data => {
          this.setState({trans: data});
        })
      }
    })
  }

  render() {
    return (
      <div className="trans-container">
          <div id="trans-block-hash"><strong>Block Hash:</strong> {this.state.trans.hash}</div>
          <div id="trans-block-vers"><strong>Block Version:</strong> {this.state.trans.ver}</div>
          <div id="trans-block-vin"><strong>Block VIN_SZ:</strong> {this.state.trans.vin_sz}</div>
          <div id="trans-block-vout"><strong>Block VOUT_ST:</strong> {this.state.trans.vout_sz}</div>
          <div id="trans-block-lock"><strong>Block Lock Time:</strong> {this.state.trans.lock_time}</div>
          <div id="trans-block-size"><strong>Block Size:</strong> {this.state.trans.size}</div>
      </div>
    )
  }
}
