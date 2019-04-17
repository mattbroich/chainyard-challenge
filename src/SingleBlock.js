import React, { Component } from 'react';
import { publishService } from './publishService.js';

export default class SingleBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      single: {
        hash: "",
        ver: "",
        prev_block: "",
        mrkl_root: "",
        time: "",
        bits: "",
        nonce: "",
        n_tx: [],
        size: "",
        block_index: "",
        main_chain: "",
        height: "",
        received_time: "",
        relayed_by: ""
      }
    };
  }

  componentDidMount() {
    this.subscription = publishService.getMessage().subscribe(message => {
      if (message.text.topic === "Latest") {
        fetch(`/singleblock/${encodeURIComponent(message.text.data)}`)
          .then(result => {
            return result.json();
          }).then(data => {
            this.setState({single: data});
            publishService.sendMessage({"topic": "Transaction", "data": data.tx[0].hash});
          })
        }
      })
  }

  render() {
    return (
      <div className="single-block-container">
        <div id="single-block-hash"><strong>Block Hash:</strong> {this.state.single.hash}</div>
        <div id="single-block-ver"><strong>Block Version:</strong> {this.state.single.ver}</div>
        <div id="single-block-prev"><strong>Previous Block:</strong> {this.state.single.prev_block}</div>
        <div id="single-block-mrkl"><strong>Block MRKL_ROOT:</strong> {this.state.single.mrkl_root}</div>
        <div id="single-block-time"><strong>Block Time:</strong> {this.state.single.time}</div>
        <div id="single-block-bits"><strong>Block Bits:</strong> {this.state.single.bits}</div>
        <div id="single-block-nonce"><strong>Block Nonce:</strong> {this.state.single.nonce}</div>
        <div id="single-block-ntx"><strong>Block N_TX:</strong> {this.state.single.n_tx}</div>
        <div id="single-block-size"><strong>Block Size:</strong> {this.state.single.size}</div>
        <div id="single-block-index"><strong>Block Index:</strong> {this.state.single.block_index}</div>
        <div id="single-block-main"><strong>Block Main Chain:</strong> {this.state.single.main_chain}</div>
        <div id="single-block-height"><strong>Block Height:</strong> {this.state.single.height}</div>
        <div id="single-block-rec"><strong>Block Received Time:</strong> {this.state.single.received_time}</div>
        <div id="single-block-relayed"><strong>Block Relayed By:</strong> {this.state.single.relayed_by}</div>
      </div>
    )
  }
}
