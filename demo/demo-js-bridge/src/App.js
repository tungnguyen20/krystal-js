import logo from './logo.svg';
import { krystal } from '@krystal-js/web-bridge';
import './App.css';
import { web3Kit } from '@krystal-js/web3-kit';
import { TransferRequest } from '@krystal-js/web3-kit';

web3Kit.transfer({
  amount: 0.01,
  toAddress: "0x8d61ab7571b117644a52240456df66ef846cd999"
})
.then((result) => {
  alert("Transaction sent successfully")
})

function App() {

  function transfer() {
    let request = new TransferRequest(0.01, "0x8d61ab7571b117644a52240456df66ef846cd999");
    web3Kit.transfer(request)
    .then((result) => {
      alert("Transaction sent successfully")
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src="dino.png" width="200px" height="200px"/>
        <br/>
        <button onClick={ transfer }>
          Buy DINO 0.01 ETH
        </button>
      </header>
    </div>
  );
}


export default App;
