import React, { Component } from 'react';
import './App.css';
import SingleBlock from './SingleBlock.js';
import TransactionBlock from './TransactionBlock.js';
import LatestBlock from './LatestBlock.js';

class App extends Component {
  render() {
    return (
    <div className="App">
        <div className="jumbotron text-center">
            <div className="container">
                <h1 className="display-2">Block Chain Viewer</h1>
                <p className="lead">This process obtains a Single Block from Block Chain, once the latest block is fetched, then it fires off a request to obtain the details of the latest block. Finally, we grab the first transaction block from the latest block to obtain transaction status.</p>
            </div>
        </div>
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <h2 className="text-center">View Latest Block</h2>
                    <div className="card border-lightgray">
                        <div clasSsName="card-body">
                            <small><LatestBlock className="block-inner"></LatestBlock></small>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <h2 className="text-center">View Single Block</h2>
                    <div className="card border-lightgray">
                        <div className="card-body">
                            <small><SingleBlock className="block-inner"></SingleBlock></small>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <h2 className="text-center">View Transaction Block</h2>
                    <div className="card border-lightgray">
                        <div className="card-body">
                            <small><TransactionBlock className="block-inner"></TransactionBlock></small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
  }
}

export default App;
