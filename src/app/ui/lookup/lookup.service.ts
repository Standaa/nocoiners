import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { from } from 'rxjs/observable/from';

import * as ethers from 'ethers';

const providers = ethers.providers;
// Connect to the network
// const provider = providers.getDefaultProvider();

// var network = providers.networks;

// Connect to a local instance
var provider = new providers.JsonRpcProvider('http://localhost:7545');

@Injectable()
export class LookupService {

  constructor(
    private http: Http
  ) {}

  addressLookup(name): Observable<any> {
    console.log('Pass');
    const address = provider.resolveName(`${name}.attwitter.eth`);
    return from(address);
  }

  createWallet(): Observable<any> {
    const wallet = ethers.Wallet.createRandom();
    return of(wallet);
  }

  deployENSDebtContract(): Observable<any> {
    // The interface from Solidity
    const abi = '[{"inputs":[{"name":"value","type":"string"}],"type":"constructor"}]';

    // The bytecode from Solidity
    const bytecode = "0x6060604052341561000c57fe5b60405161012d38038061012d83398101604052" +
                     "8080518201919050505b806000908051906020019061003f929190610047565b" +
                     "505b506100ec565b828054600181600116156101000203166002900490600052" +
                     "602060002090601f016020900481019282601f1061008857805160ff19168380" +
                     "011785556100b6565b828001600101855582156100b6579182015b8281111561" +
                     "00b557825182559160200191906001019061009a565b5b5090506100c3919061" +
                     "00c7565b5090565b6100e991905b808211156100e55760008160009055506001" +
                     "016100cd565b5090565b90565b6033806100fa6000396000f30060606040525b" +
                     "fe00a165627a7a72305820041f440021b887310055b6f4e647c2844f4e1c8cf1" +
                     "d8e037c72cd7d0aa671e2f0029";

    // Notice we pass in "Hello World" as the parameter to the constructor
    const deployTransaction = ethers.Contract.getDeployTransaction(bytecode, abi, "Hello World");
    console.log(deployTransaction);
    // {
    //    data: "0x6060604052341561000c57fe5b60405161012d38038061012d83398101604052" +
    //            "8080518201919050505b806000908051906020019061003f929190610047565b" +
    //            "505b506100ec565b828054600181600116156101000203166002900490600052" +
    //            "602060002090601f016020900481019282601f1061008857805160ff19168380" +
    //            "011785556100b6565b828001600101855582156100b6579182015b8281111561" +
    //            "00b557825182559160200191906001019061009a565b5b5090506100c3919061" +
    //            "00c7565b5090565b6100e991905b808211156100e55760008160009055506001" +
    //            "016100cd565b5090565b90565b6033806100fa6000396000f30060606040525b" +
    //            "fe00a165627a7a72305820041f440021b887310055b6f4e647c2844f4e1c8cf1" +
    //            "d8e037c72cd7d0aa671e2f002900000000000000000000000000000000000000" +
    //            "0000000000000000000000002000000000000000000000000000000000000000" +
    //            "0000000000000000000000000b48656c6c6f20576f726c640000000000000000" +
    //            "00000000000000000000000000"
    // }


    // Create a wallet to deploy the contract with. Using Ganache address 0x149367d074EE8115F5bb108758E0beaE966F99F5

    const privateKey = '88a96b007f61dc1207d847bebd0d470eb70c548e9feaec510ae974f8960518aa';
    const wallet = new ethers.Wallet(privateKey, provider);

    // Send the transaction
    const sendPromise = wallet.sendTransaction(deployTransaction);

    // Get the transaction
    // sendPromise.then(function(transaction) {
    //     console.log('transaction', transaction);
    // });

    return from(sendPromise);

  }


}
