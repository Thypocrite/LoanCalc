const LoanAmountEl = document.querySelector("#loanAmount");
const InterestRateEl = document.querySelector("#interestRate");
const LoanTermEl = document.querySelector("#loanTerm");
const resultEl = document.querySelector("#result");
const tableResultEl = document.querySelector("#tableResult");
const yearLoanTermEl = document.querySelector("#yearLoanTerm");

console.log(tableResultEl, yearLoanTermEl);
console.log(calcResult(200000, 4.5, 10));

/**
 * 本金攤還計算公式
 * @param {*} loanAmount 
 * @param {*} interestRate 
 * @param {*} loanTerm 
 * @returns 
 */
function calcResult(loanAmount, interestRate, loanTerm) {
    let resultArray = [];
    let proid = loanTerm * 12;
    let monthReplacement = parseInt(loanAmount / proid);
    // 取得期數還款資訊
    for (let i = 0; i < proid; i++) {
        let interest = Math.round(loanAmount * (interestRate / 100 / 12));
        resultArray[i] = new Array();
        if (i == proid - 1) {
            resultArray[i].push(i + 1);
            resultArray[i].push(monthReplacement + loanAmount - monthReplacement);
            resultArray[i].push(interest);
            resultArray[i].push(monthReplacement + loanAmount - monthReplacement + interest);
            resultArray[i].push(0);
        }
        else {
            resultArray[i].push(i + 1);
            resultArray[i].push(monthReplacement);
            resultArray[i].push(interest);
            resultArray[i].push(monthReplacement + interest);
            resultArray[i].push(loanAmount - monthReplacement);
        }

        loanAmount -= monthReplacement;
    }

    return resultArray;
}

function insertDataToTable() {
    // 清除rows
    while (tableResultEl.rows.length > 1) {
        tableResultEl.deleteRow(1);
    }
    // 貸款金額
    let loanAmount = LoanAmountEl.value * 10000;
    // 年利率
    let interestRate = InterestRateEl.value;
    // 年期(三元運算子)   
    let loanTerm = yearLoanTermEl.value != "" ? yearLoanTermEl.value : LoanTermEl.value;

    if (loanTerm <= 0) {
        resultEl.innerHTML = "貸款年限輸入不能小於等於零";
        return;
    }

    let resultArray = calcResult(loanAmount, interestRate, loanTerm);
    let totalInterest = 0;

    for (let i = 0; i < resultArray.length; i++) {
        // 取得列物件
        let row = tableResultEl.insertRow();
        for (let j = 0; j < resultArray[i].length; j++) {
            //插入行物件
            row.insertCell().innerText = resultArray[i][j];
        }
        totalInterest += resultArray[i][2];
    }

    resultEl.innerHTML = `總期數:${resultArray.length} 總支出:${Number(LoanAmountEl.value) + totalInterest} 利息:${totalInterest}`;
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
        tableHtml += "<tr>";
        let interest = Math.round(loanAmount * (interestRate / 100 / 12));
        totalInterest += interest;
        let text;
        if (i == proid - 1) {
            tableHtml += `<td>${i + 1}</td>`;
            tableHtml += `<td>${monthReplacement + loanAmount - monthReplacement}</td>`;
            tableHtml += `<td>${interest}</td>`;
            tableHtml += `<td>${monthReplacement + loanAmount - monthReplacement + interest}</td>`;
            tableHtml += `<td>${0}</td>`;
        }
        else {
            tableHtml += `<td>${i + 1}</td>`;
            tableHtml += `<td>${monthReplacement}</td>`;
            tableHtml += `<td>${interest}</td>`;
            tableHtml += `<td>${monthReplacement + interest}</td>`;
            tableHtml += `<td>${loanAmount - monthReplacement}</td>`;
        }

        tableHtml += "</tr>";
        loanAmount -= monthReplacement;
    }

    tableHtml += "</table>";
    console.log(tableHtml);
    resultEl.innerHTML = `<h2>總支出利息:${totalInterest}</h2>` + tableHtml;
}



function calc() {
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
        let interest = Math.round(loanAmount * (interestRate / 100 / 12));
        totalInterest += interest;
        let text;
        if (i == proid - 1) {
            text = `期別:${i + 1} 償還本金:${monthReplacement + loanAmount - monthReplacement} 償還利息:${interest} 
            償還本利和:${monthReplacement + loanAmount - monthReplacement + interest} 貸款餘額:${0}`
            console.log(text);
        }
        else {
            text = `期別:${i + 1} 償還本金:${monthReplacement} 償還利息:${interest} 
            償還本利和:${monthReplacement + interest} 貸款餘額:${loanAmount - monthReplacement}`
            console.log(text);

        }

        resultEl.innerHTML += `<li>${text}</li>`;
        loanAmount -= monthReplacement;
    }

    resultEl.innerHTML += `<h2>總支出利息:${totalInterest}</h2>`;
}