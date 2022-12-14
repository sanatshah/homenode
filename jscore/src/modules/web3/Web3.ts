import Module from "../Module";
import Core from "../../Core";
import { makeObservable, observable } from "mobx";


/**
 *
 */

enum Environments {
    dev = "dev",
    prod = "prod"
}

interface Config {
}

interface DependencyInjection {

}

interface User {
  profileURL?: string
}

export default class Web3 extends Module {
  private static instance: Web3;
  private _address: any;
  private _signer: any;
  private _provider: any;

  public user: User = {};

  public isConnected: boolean = false;

  constructor(core : Core<{}>, private config : Config, private dependencyInjection: DependencyInjection) {
    super(core);
    makeObservable(this, {
      user: observable,
      isConnected: observable
    })

    Web3.instance = this
  }

  public static getInstance(core: Core): Web3 | undefined {
      if (!Web3.instance) {
        return
      }

      return Web3.instance;
  }


  get address() {
    return this._address
  } 

  get signer() {
    return this._signer
  } 

  get provider() {
    return this._provider
  } 

  async start(){
    //TODO:  Load anything from storage 


  }

  public setSigner(){
    console.log("setting signer!!")
  }

  public setUser(address, signer, provider){
    this._address = address;
    this._signer = signer;
    this._provider = provider
    this.isConnected = true
    this.isReady = true
  }

  public setUserProfile(profileURL){
    this.user = {
      profileURL: profileURL
    }
  }

  async restart(){
    this.user = {};
    this.isConnected = false
    this._address = undefined
    this._signer = undefined
    this._provider = undefined
  }

}
