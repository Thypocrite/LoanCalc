const LoanAmountEl = document.querySelector("#loanAmount");
const InterestRateEl = document.querySelector("#interestRate");
const LoanTermEl = document.querySelector("#loanTerm");
const resultEl = document.querySelector("#result");
const tableResultEl = document.querySelector("#tableResult");

console.log(tableResultEl);


function calcB() {
    // 貸款金額
    let loanAmount = LoanAmountEl.value;
    // 年利率
    let interestRate = InterestRateEl.value;
    // 年限
    let loanTerm = LoanTermEl.value;
    console.log(loanAmount, interestRate, loanTerm);
    let proid = loanTerm * 12;
    let monthReplacement = parseInt(loanAmount / proid);
    // 計算總利息
    let totalInterest = 0;
    // 取得期數還款資訊
    for (let i = 0; i < proid; i++) {
        let interest = Math.round(loanAmount * (interestRate / 100 / 12));
        totalInterest += interest;
        //取得列物件
        let row = tableResultEl.insertRow();
        if (i == proid - 1) {
            //插入行物件
            row.insertCell().innerText = i + 1;
            row.insertCell().innerText = monthReplacement + loanAmount - monthReplacement;
            row.insertCell().innerText = interest;
            row.insertCell().innerText = monthReplacement + loanAmount - monthReplacement + interest;
            row.insertCell().innerText = 0;
        }
        else {
            row.insertCell().innerText = i + 1;
            row.insertCell().innerText = monthReplacement;
            row.insertCell().innerText = interest;
            row.insertCell().innerText = monthReplacement + interest;
            row.insertCell().innerText = loanAmount - monthReplacement;
        }
        loanAmount -= monthReplacement;
    }
    resultEl.innerHTML+=`<h2>總支出:${Number(LoanAmountEl.value)+totalInterest} 利息:${totalInterest}</h2>`;
    resultEl.innerHTML+=`<h2></h2>`;
}

function calcA() {
    let tableHtml = `
    <table border="1">
        <thead> 
            <tr> 
                <th>期別</th>
                <th>償還本金</th>
                <th>償還利息</th>
                <th>償還本利和</th>
                <th>貸款餘額</th>
            </tr>
        </thead>               
        `
    // 貸款金額
    let loanAmount = LoanAmountEl.value;
    // 年利率
    let interestRate = InterestRateEl.value;
    // 年限
    let loanTerm = LoanTermEl.value;

    console.log(loanAmount, interestRate, loanTerm);

    let proid = loanTerm * 12;
    let monthReplacement = parseInt(loanAmount / proid);

    let totalInterest = 0;
    
    for (let i = 0; i < proid; i++) {
        tableHtml+="<tr>"
        let interest = Math.round(loanAmount * (interestRate / 100 / 12));
        totalInterest += interest;
        let text;
        if (i == proid - 1) {
            tableHtml +=`<td>${i + 1}</td>`;
            tableHtml +=`<td>${monthReplacement + loanAmount - monthReplacement}</td>`;
            tableHtml +=`<td>${interest}</td>`;
            tableHtml +=`<td>${monthReplacement + loanAmount - monthReplacement + interest}</td>`;
            tableHtml +=`<td>${0}</td>`;
            
        }
        else {
            tableHtml+=`<td>${i + 1}</td>`;
            tableHtml+=`<td>${monthReplacement}</td>`;
            tableHtml+=`<td>${interest} </td>`;
            tableHtml+=`<td>${monthReplacement + interest}</td>`;
            tableHtml+=`<td>${loanAmount - monthReplacement}</td>`;
        }

        tableHtml+="</tr>"
    

        loanAmount -= monthReplacement;
    }
    console.log(tableHtml);
    resultEl.innerHTML+=`<h2>總支出利息:${totalInterest}</h2>`;
    resultEl.innerHTML+=tableHtml;
    
    //print(f'總支出利息:{totalInterest}')
}