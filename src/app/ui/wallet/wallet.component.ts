import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SharedService } from '../../shared.service';

import * as IPFS from 'ipfs';

const node = new IPFS();

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  walletData: Object;

  constructor(
    private route: ActivatedRoute,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.retrieveWalletData();
    this.encryptPrivateKey();
    this.storeEncryptedKeyIPFS();
    console.log(this.walletData);
  }

  retrieveWalletData() {
    this.walletData = this.sharedService.getWalletData();
  }

  encryptPrivateKey() {

  }

  async storeEncryptedKeyIPFS() {
    await node.files.add({
      path: 'hello.txt',
      content: Buffer.from('Hello World 101')
    })
  }


}