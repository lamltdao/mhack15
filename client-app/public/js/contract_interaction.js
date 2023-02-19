/**
 * Created by milenradkov on 8.03.18.
 */
$(document).ready(async function() {
    try {
        let signer = null;
        let provider;
    
        let peerToPeerLendingContractAddress = '0x0Db8e52c3eC38D1025C5f401A54Efb924046B98f';
        let peerToPeerLendingContractABI = [
            {
              "inputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "constructor"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "_address",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "bool",
                  "name": "active",
                  "type": "bool"
                },
                {
                  "indexed": true,
                  "internalType": "uint256",
                  "name": "timestamp",
                  "type": "uint256"
                }
              ],
              "name": "LogCreditActiveChanged",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "_address",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "_borrower",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "uint256",
                  "name": "timestamp",
                  "type": "uint256"
                }
              ],
              "name": "LogCreditCreated",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "_address",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "enum Credit.State",
                  "name": "state",
                  "type": "uint8"
                },
                {
                  "indexed": true,
                  "internalType": "uint256",
                  "name": "timestamp",
                  "type": "uint256"
                }
              ],
              "name": "LogCreditStateChanged",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "_currentOwner",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "_newOwner",
                  "type": "address"
                }
              ],
              "name": "LogOwnershipTransfered",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "_address",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "bool",
                  "name": "fraudStatus",
                  "type": "bool"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "timestamp",
                  "type": "uint256"
                }
              ],
              "name": "LogUserSetFraud",
              "type": "event"
            },
            {
              "constant": true,
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "name": "credits",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
            },
            {
              "constant": false,
              "inputs": [],
              "name": "destroy",
              "outputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "constant": false,
              "inputs": [
                {
                  "internalType": "address payable",
                  "name": "_recipient",
                  "type": "address"
                }
              ],
              "name": "destroyAndSend",
              "outputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "constant": true,
              "inputs": [],
              "name": "owner",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
            },
            {
              "constant": true,
              "inputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "name": "users",
              "outputs": [
                {
                  "internalType": "bool",
                  "name": "credited",
                  "type": "bool"
                },
                {
                  "internalType": "address",
                  "name": "activeCredit",
                  "type": "address"
                },
                {
                  "internalType": "bool",
                  "name": "fraudStatus",
                  "type": "bool"
                }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
            },
            {
              "constant": false,
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "requestedAmount",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "repaymentsCount",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "interest",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes32",
                  "name": "creditDescription",
                  "type": "bytes32"
                }
              ],
              "name": "applyForCredit",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "_credit",
                  "type": "address"
                }
              ],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "constant": true,
              "inputs": [],
              "name": "getCredits",
              "outputs": [
                {
                  "internalType": "address[]",
                  "name": "",
                  "type": "address[]"
                }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
            },
            {
              "constant": true,
              "inputs": [],
              "name": "getUserCredits",
              "outputs": [
                {
                  "internalType": "address[]",
                  "name": "",
                  "type": "address[]"
                }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
            },
            {
              "constant": false,
              "inputs": [
                {
                  "internalType": "address",
                  "name": "_borrower",
                  "type": "address"
                }
              ],
              "name": "setFraudStatus",
              "outputs": [
                {
                  "internalType": "bool",
                  "name": "",
                  "type": "bool"
                }
              ],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "constant": false,
              "inputs": [
                {
                  "internalType": "contract Credit",
                  "name": "_credit",
                  "type": "address"
                }
              ],
              "name": "changeCreditState",
              "outputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "constant": false,
              "inputs": [
                {
                  "internalType": "contract Credit",
                  "name": "_credit",
                  "type": "address"
                },
                {
                  "internalType": "enum Credit.State",
                  "name": "state",
                  "type": "uint8"
                }
              ],
              "name": "changeCreditState",
              "outputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
            }
          ];
    
        let creditContractABI = [
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "_requestedAmount",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "_requestedRepayments",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "_interest",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes32",
                  "name": "_description",
                  "type": "bytes32"
                }
              ],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "constructor"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "_address",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "uint256",
                  "name": "_amount",
                  "type": "uint256"
                },
                {
                  "indexed": true,
                  "internalType": "uint256",
                  "name": "timestamp",
                  "type": "uint256"
                }
              ],
              "name": "LogBorrowerChangeReturned",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "_address",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "bool",
                  "name": "fraudStatus",
                  "type": "bool"
                },
                {
                  "indexed": true,
                  "internalType": "uint256",
                  "name": "timestamp",
                  "type": "uint256"
                }
              ],
              "name": "LogBorrowerIsFraud",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "_address",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "uint256",
                  "name": "timestamp",
                  "type": "uint256"
                }
              ],
              "name": "LogBorrowerRepaymentFinished",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "_address",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "uint256",
                  "name": "_amount",
                  "type": "uint256"
                },
                {
                  "indexed": true,
                  "internalType": "uint256",
                  "name": "timestamp",
                  "type": "uint256"
                }
              ],
              "name": "LogBorrowerRepaymentInstallment",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "_address",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "uint256",
                  "name": "_amount",
                  "type": "uint256"
                },
                {
                  "indexed": true,
                  "internalType": "uint256",
                  "name": "timestamp",
                  "type": "uint256"
                }
              ],
              "name": "LogBorrowerWithdrawal",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "_address",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "uint256",
                  "name": "timestamp",
                  "type": "uint256"
                }
              ],
              "name": "LogCreditInitialized",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "bool",
                  "name": "active",
                  "type": "bool"
                },
                {
                  "indexed": true,
                  "internalType": "uint256",
                  "name": "timestamp",
                  "type": "uint256"
                }
              ],
              "name": "LogCreditStateActiveChanged",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "enum Credit.State",
                  "name": "state",
                  "type": "uint8"
                },
                {
                  "indexed": true,
                  "internalType": "uint256",
                  "name": "timestamp",
                  "type": "uint256"
                }
              ],
              "name": "LogCreditStateChanged",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "_address",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "uint256",
                  "name": "_amount",
                  "type": "uint256"
                },
                {
                  "indexed": true,
                  "internalType": "uint256",
                  "name": "timestamp",
                  "type": "uint256"
                }
              ],
              "name": "LogLenderChangeReturned",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "_address",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "uint256",
                  "name": "_amount",
                  "type": "uint256"
                },
                {
                  "indexed": true,
                  "internalType": "uint256",
                  "name": "timestamp",
                  "type": "uint256"
                }
              ],
              "name": "LogLenderInvestment",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "_address",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "uint256",
                  "name": "_amount",
                  "type": "uint256"
                },
                {
                  "indexed": true,
                  "internalType": "uint256",
                  "name": "timestamp",
                  "type": "uint256"
                }
              ],
              "name": "LogLenderRefunded",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "_address",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "uint256",
                  "name": "timestamp",
                  "type": "uint256"
                }
              ],
              "name": "LogLenderVoteForFraud",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "_address",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "uint256",
                  "name": "timestamp",
                  "type": "uint256"
                }
              ],
              "name": "LogLenderVoteForRevoking",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "_address",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "uint256",
                  "name": "_amount",
                  "type": "uint256"
                },
                {
                  "indexed": true,
                  "internalType": "uint256",
                  "name": "timestamp",
                  "type": "uint256"
                }
              ],
              "name": "LogLenderWithdrawal",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "_currentOwner",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "_newOwner",
                  "type": "address"
                }
              ],
              "name": "LogOwnershipTransfered",
              "type": "event"
            },
            {
              "constant": false,
              "inputs": [],
              "name": "destroy",
              "outputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "constant": false,
              "inputs": [
                {
                  "internalType": "address payable",
                  "name": "_recipient",
                  "type": "address"
                }
              ],
              "name": "destroyAndSend",
              "outputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "constant": true,
              "inputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "name": "lenders",
              "outputs": [
                {
                  "internalType": "bool",
                  "name": "",
                  "type": "bool"
                }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
            },
            {
              "constant": true,
              "inputs": [],
              "name": "owner",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
            },
            {
              "constant": true,
              "inputs": [],
              "name": "getBalance",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
            },
            {
              "constant": false,
              "inputs": [],
              "name": "invest",
              "outputs": [],
              "payable": true,
              "stateMutability": "payable",
              "type": "function"
            },
            {
              "constant": false,
              "inputs": [],
              "name": "repay",
              "outputs": [],
              "payable": true,
              "stateMutability": "payable",
              "type": "function"
            },
            {
              "constant": false,
              "inputs": [],
              "name": "withdraw",
              "outputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "constant": false,
              "inputs": [],
              "name": "requestInterest",
              "outputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "constant": true,
              "inputs": [],
              "name": "getCreditInfo",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                },
                {
                  "internalType": "bytes32",
                  "name": "",
                  "type": "bytes32"
                },
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                },
                {
                  "internalType": "enum Credit.State",
                  "name": "",
                  "type": "uint8"
                },
                {
                  "internalType": "bool",
                  "name": "",
                  "type": "bool"
                },
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
            },
            {
              "constant": false,
              "inputs": [],
              "name": "revokeVote",
              "outputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "constant": false,
              "inputs": [],
              "name": "refund",
              "outputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "constant": false,
              "inputs": [],
              "name": "fraudVote",
              "outputs": [
                {
                  "internalType": "bool",
                  "name": "",
                  "type": "bool"
                }
              ],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "constant": false,
              "inputs": [
                {
                  "internalType": "enum Credit.State",
                  "name": "_state",
                  "type": "uint8"
                }
              ],
              "name": "changeState",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "constant": false,
              "inputs": [],
              "name": "toggleActive",
              "outputs": [
                {
                  "internalType": "bool",
                  "name": "",
                  "type": "bool"
                }
              ],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
            }
          ];
    
        if (typeof window.ethereum == 'undefined')
            return showError("Please install MetaMask to access the Ethereum Web3 API from your Web browser.");
        provider = new ethers.providers.JsonRpcProvider("http://localhost:7545")
        
        signer = provider.getSigner()
        let peerToPeerLendingContractInstance = new ethers.Contract(peerToPeerLendingContractAddress, peerToPeerLendingContractABI, provider)
        let creditStates = ["Investment", "Repayment", "Interest returns", "Expired", "Revoked", "Fraud"];
        const result = await peerToPeerLendingContractInstance.getCredits();
        result.forEach(function(index){
            let creditAddress = index;
            let creditContract = new ethers.Contract(creditAddress, creditContractABI, provider);
    
            creditContract.getCreditInfo(function(err, info) {
               if (err){
                   console.log(err);
               }
    
               let creditContractInfo = {
                   address: creditAddress,
                   borrower: info[0],
                   description: web3.toAscii(info[1]),
                   requestedAmount: info[2].toString(10),
                   requestedRepayments: info[3].toString(10),
                   repaymentInstallment: info[4].toString(10),
                   remainingRepayments: info[5].toString(10),
                   interest: info[6].toString(10),
                   returnAmount: info[7].toString(10),
                   state: parseInt(info[8].toString(10)),
                   active: info[9],
                   balance: info[10].toString(10)
               }
    
                $('#activeCredits')
                    .append(`<div class="col-sm-6 mt-5">
                                <div class="card">
                                    <div class="card-header ${creditContractInfo.active == true ? "alert-success" : "alert-secondary"}">
                                        <h5 class="card-title">${creditContractInfo.description}</h5>
                                        <p>State: <span class="badge badge-primary">${creditStates[creditContractInfo.state]}</span></p>
                                    </div>
                                    <div class="card-body">
                                        <p class="card-text">
                                            <span class="credit-description-property">Address:</span> ${creditContractInfo.address}
                                        </p>
                                        <p class="card-text">
                                            <span class="credit-description-property">Borrower:</span> <a class="text-primary" href="/check?address=${creditContractInfo.borrower}" >${creditContractInfo.borrower}</a>
                                        </p>
                                        <p class="card-text">
                                            <span class="credit-description-property">Requested:</span> ${web3.fromWei(creditContractInfo.requestedAmount, "ether")} ETH
                                        </p>
                                        <p class="card-text">
                                            <span class="credit-description-property">Funded:</span> ${web3.fromWei(creditContractInfo.balance, "ether")} ETH
                                        </p>
                                        <p class="card-text">
                                            <span class="credit-description-property">Installments Count:</span> ${creditContractInfo.requestedRepayments}
                                        </p>
                                        <p class="card-text">
                                            <span class="credit-description-property">Interest:</span> ${web3.fromWei(creditContractInfo.interest, "ether")} ETH
                                        </p>
                                    </div>
                                    <div class="card-footer">
    
                                        <div class="input-group mb-3 investment-card" ${creditContractInfo.state !== 0 ? 'style="display:none;"' : ''}>
                                          <input type="number" class="form-control" name="amount" placeholder="Amount" aria-label="Amount" aria-describedby="basic-addon2">
                                          <div class="input-group-append">
                                            <button class="btn btn-outline-success" type="button" name="invest" data-contract-address="${creditContractInfo.address}">Invest</button>
                                          </div>
                                        </div>
                                        <div class="mb-3">
                                            <button type="button" class="btn btn-info" ${creditContractInfo.state !== 2 ? 'style="display:none;"' : ''} name="requestInterest" data-contract-address="${creditContractInfo.address}">Get interest</button>
                                            <button type="button" class="btn btn-warning" name="revokeVote" data-contract-address="${creditContractInfo.address}">Revoke vote</button>
                                            <button type="button" class="btn btn-warning" name="refund" data-contract-address="${creditContractInfo.address}">Refund</button>
                                            <button type="button" class="btn btn-danger" name="fraudVote" data-contract-address="${creditContractInfo.address}">Fraud</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `)
            })
        })    
    
        $('body').on('click', 'button[name="invest"]', function (e) {
            e.preventDefault();
            let address = $(this).attr('data-contract-address');
            let amountField = $(this).closest('div.investment-card').find('input');
            let amount = amountField.val();
            let selectedCreditContract = web3.eth.contract(creditContractABI).at(address);
            let getData = selectedCreditContract.invest.getData();
    
            if (amount < 0 || amount == "" || amount == "undefined"){
                swal({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Amount is missing!',
                })
                return;
            }
    
            swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, invest!'
            }).then((result) => {
                if (result.value) {
                    web3.eth.sendTransaction({from: web3.eth.coinbase, to: address, data: getData, value:web3.toWei(amount, "ether")}, function (err, result) {
                        if (err){
                            console.log(err);
                            return;
                        }
    
                        swal(
                            'Invested!',
                            'Your investment was sent.',
                            'success'
                        )
                        amountField.val('');
                        console.log("tx.hash: "+result.transactionHash);
                    })
                }
            })
        });
    
        $('body').on('click', 'button[name="repayInstallment"]', function (e) {
            e.preventDefault();
            let address = $(this).attr('data-contract-address');
            let amountField = $(this).closest('div.investment-card').find('input');
            let amount = amountField.val();
            let selectedCreditContract = web3.eth.contract(creditContractABI).at(address);
            let getData = selectedCreditContract.repay.getData();
    
            if (amount < 0 || amount == "" || amount == "undefined"){
                swal({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Amount is missing!',
                })
                return;
            }
    
            web3.eth.sendTransaction({from: web3.eth.coinbase, to: address, data: getData, value:web3.toWei(amount, "ether")}, function (err, result) {
                if (err){
                    console.log(err);
                    return;
                }
    
                swal(
                    'Success!',
                    'Your repayment was collected.',
                    'success'
                )
                amountField.val('');
                console.log("tx.hash: "+result.transactionHash);
            })
        });
    
        $('body').on('click', 'button[name="requestInterest"]', function (e) {
            e.preventDefault();
            let address = $(this).attr('data-contract-address');
    
            console.log('requestInterest from ' + address);
    
            let selectedCreditContract = web3.eth.contract(creditContractABI).at(address);
            let getData = selectedCreditContract.requestInterest.getData();
            web3.eth.sendTransaction({from: web3.eth.coinbase, to: address, data: getData}, function (err, result) {
                if (err){
                    console.log(err);
                    return;
                }
    
                console.log(result);
            })
        });
    
        $('body').on('click', 'button[name="refund"]', function (e) {
            e.preventDefault();
            let address = $(this).attr('data-contract-address');
    
            console.log('refund request from ' + address);
    
            let selectedCreditContract = web3.eth.contract(creditContractABI).at(address);
            let getData = selectedCreditContract.refund.getData();
            web3.eth.sendTransaction({from: web3.eth.coinbase, to: address, data: getData}, function (err, result) {
                if (err){
                    console.log(err);
                    return;
                }
    
                console.log(result);
            })
        });
    
        $('body').on('click', 'button[name="revokeVote"]', function (e) {
            e.preventDefault();
            let address = $(this).attr('data-contract-address');
    
            console.log('revoke vote ' + address);
    
            let selectedCreditContract = web3.eth.contract(creditContractABI).at(address);
            let getData = selectedCreditContract.revokeVote.getData();
            web3.eth.sendTransaction({from: web3.eth.coinbase, to: address, data: getData}, function (err, result) {
                if (err){
                    console.log(err);
                    return;
                }
    
                console.log(result);
            })
        });
    
        $('body').on('click', 'button[name="fraudVote"]', function (e) {
            e.preventDefault();
            let address = $(this).attr('data-contract-address');
            let selectedCreditContract = web3.eth.contract(creditContractABI).at(address);
            let getData = selectedCreditContract.fraudVote.getData();
    
            console.log('fraud vote ' + address);
    
            swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, vote!'
            }).then((result) => {
                if (result.value) {
                    web3.eth.sendTransaction({from: web3.eth.coinbase, to: address, data: getData}, function (err, result) {
                        if (err){
                            console.log(err);
                            return;
                        }
    
                        swal(
                            'Voted!',
                            'Your vote was saved.',
                            'success'
                        )
                        console.log(result);
                    })
                }
            })
        });
    
        $('body').on('click', 'button[name="withdraw"]', function (e) {
            e.preventDefault();
            let address = $(this).attr('data-contract-address');
            let selectedCreditContract = web3.eth.contract(creditContractABI).at(address);
            let getData = selectedCreditContract.withdraw.getData();
    
            console.log('withdraw ' + address);
    
            selectedCreditContract.withdraw(function (err, result) {
                if (err){
                    console.log(err);
                    return;
                }
    
                swal(
                    'Success!',
                    'Your account was credited.',
                    'success'
                )
                console.log(result);
            })
        });
    
        $('body').on('submit', '#borrowRequest', function (e) {
            e.preventDefault();
    
            let creditDescription = $(this).find('input[name="creditDescription"]').val();
            let creditRequestedAmount = $(this).find('input[name="creditRequestedAmount"]').val();
            let creditRequestedInstallmentsCount = $(this).find('input[name="creditRequestedInstallmentsCount"]').val();
            let creditRequestedInterest = $(this).find('input[name="creditRequestedInterest"]').val();
    
            peerToPeerLendingContractInstance.applyForCredit(web3.toWei(creditRequestedAmount, "ether").toString(10),creditRequestedInstallmentsCount, web3.toWei(creditRequestedInterest, "ether").toString(10), creditDescription, function(err, result) {
                if (err){
                    console.log(err);
                    return showError("Smart contract call failed");
                }
    
                web3.eth.getTransactionReceipt(result, (err, result) => {
                    if (err) {
                        return showError("Smart contract call failed");
                    }
    
                    console.log(result);
                    showInfo(`Credit successfully requested.`);
                });
            });
        });
    
    
        if (top.location.pathname === '/lend') {
            console.log('lend');
        }
        else if (top.location.pathname === "/borrow") {
            const result = await peerToPeerLendingContractInstance.users('0x8593fCAD531f25Ab9d0FFCbEa8e5289c3D08DBB5')
    
            console.log(result);

            let user = {
                credited: result[0],
                lastCredit: result[1],
                fraudStatus: result[2]
            }

            if (user.credited == true){
                $('#borrowContent')
                    .append(`
                        <div class="col-sm-8 offset-sm-2 alert-info">
                            <p>You cannot request another credit until you repay the last one!</p>
                        </div>
                `)
            }
            else {
                $('#borrowContent')
                    .append(`
                        <form id="borrowRequest">
                            <h1 class="text-center">Borrow request</h1>
                            <div class="form-group">
                                <label for="creditDescription">Description</label>
                                <input type="text" class="form-control" name="creditDescription" placeholder="Why do you need the money?" required>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-4">
                                    <label for="creditRequestedAmount">Requested Amount:</label>
                                    <input type="number" class="form-control" name="creditRequestedAmount" placeholder="e.g. 0.01 ETH" required>
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="creditRequestedInstallmentsCount">Installments count:</label>
                                    <input type="number" class="form-control" name="creditRequestedInstallmentsCount" placeholder="e.g. 2" required>
                                </div>
                                    <div class="form-group col-md-4">
                                    <label for="creditRequestedInterest">Interest:</label>
                                    <input type="number" class="form-control" name="creditRequestedInterest" placeholder="e.g. 2 ETH" required>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary btn-lg btn-block">Ask for funding</button>
                        </form>
                `)
            }
        }
        else if (top.location.pathname === "/profile") {
            console.log('profile');
    
            peerToPeerLendingContractInstance.getUserCredits(function(err, result) {
                if (err){
                    console.log(err);
                    return;
                }
    
                console.log(result);
    
                result.forEach(function(index){
                    let creditAddress = index;
                    let creditContract = web3.eth.contract(creditContractABI).at(creditAddress);
    
                    creditContract.getCreditInfo(function(err, info) {
                        if (err){
                            console.log(err);
                        }
    
                        let creditContractInfo = {
                            address: creditAddress,
                            borrower: info[0],
                            description: web3.toAscii(info[1]),
                            requestedAmount: info[2].toString(10),
                            requestedRepayments: info[3].toString(10),
                            repaymentInstallment: info[4].toString(10),
                            remainingRepayments: info[5].toString(10),
                            interest: info[6].toString(10),
                            returnAmount: info[7].toString(10),
                            state: parseInt(info[8].toString(10)),
                            active: info[9],
                            balance: info[10].toString(10)
                        }
    
                        $('#myCredits')
                            .append(`<div class="col-sm-6 mt-5">
                                    <div class="card">
                                        <div class="card-header ${creditContractInfo.active == true ? "alert-success" : "alert-secondary"}">
                                            <h5 class="card-title">${creditContractInfo.description}</h5>
                                            <p>State: <span class="badge badge-primary">${creditStates[creditContractInfo.state]}</span></p>
                                        </div>
                                        <div class="card-body">
                                            <p class="card-text">
                                                <span class="credit-description-property">Address:</span> ${creditContractInfo.address}
                                            </p>
                                            <p class="card-text">
                                                <span class="credit-description-property">Requested:</span> ${web3.fromWei(creditContractInfo.requestedAmount, "ether")} ETH
                                            </p>
                                            <p class="card-text">
                                                <span class="credit-description-property">Funded:</span> ${web3.fromWei(creditContractInfo.balance, "ether")} ETH
                                            </p>
                                            <p class="card-text">
                                                <span class="credit-description-property">Installments Count:</span> ${creditContractInfo.requestedRepayments}
                                            </p>
                                            <p class="card-text">
                                                <span class="credit-description-property">Interest:</span> ${web3.fromWei(creditContractInfo.interest, "ether")} ETH
                                            </p>
                                        </div>
                                        <div class="card-footer" ${creditContractInfo.state !== 1 ? 'style="display:none;"' : ''}>
                                            <div class="input-group mb-3 investment-card">
                                              <input type="number" class="form-control" name="amount" placeholder="Amount" aria-label="Amount" aria-describedby="basic-addon2">
                                              <div class="input-group-append">
                                                <button class="btn btn-outline-success" type="button" name="repayInstallment" data-contract-address="${creditContractInfo.address}">Repay installment</button>
                                              </div>
                                            </div>
                                            <div class="mb-3">
                                                <button type="button" class="btn btn-info" name="withdraw" data-contract-address="${creditContractInfo.address}">Withdraw</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                `)
                    })
                })
            });
    
    
        }
        else if (top.location.pathname === "/check") {
            let address = getUrlParameter('address');
            peerToPeerLendingContractInstance.users(address, function(err, result) {
                if (err) {
                    console.log(err);
                    return;
                }
    
                console.log(result);
    
                let user = {
                    credited: result[0],
                    lastCredit: result[1],
                    fraudStatus: result[2]
                }
    
                $('#checkContent')
                    .append(`<div class="col-sm-8 offset-sm-2 ${user.fraudStatus == true ? "alert-danger" : "alert-success"}">
                                <p>Credited: ${user.credited == true ? "Yes" : "No"} </p>
                                <p>Last credit: ${user.lastCredit} </p>
                                <p>Fraud status: ${user.fraudStatus == true ? "Fraudlent" : "Good"} </p>
                            </div>`)
            })
        }
    
    
        // Attach AJAX "loading" event listener
        $(document).on({
            ajaxStart: function() { $("#loadingBox").show() },
            ajaxStop: function() { $("#loadingBox").hide() }
        });
    
        function showSuccess(message) {
            swal({
                type: 'success',
                title: message,
                showConfirmButton: false,
                timer: 1500
            })
        }
    
        function showInfo(message) {
            swal(
                'Info?',
                message,
                'question'
            )
            console.log(message);
        }
        //
        function showError(errorMsg) {
            swal({
                type: 'error',
                title: 'Oops...',
                text: errorMsg,
            })
            console.log(errorMsg);
        }
    
        function getUrlParameter(sParam) {
            let sPageURL = decodeURIComponent(window.location.search.substring(1)),
                sURLVariables = sPageURL.split('&'),
                sParameterName,
                i;
    
            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');
    
                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ? true : sParameterName[1];
                }
            }
        };
    }
    catch (err) {
        console.log(err);
    }
});

