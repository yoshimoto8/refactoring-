function statement(invoice, plays) {
  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }
  //問い合わせによる一時変数の置き換え
  function amoutFor(aPerformance) {
    let result = 0;
    switch (playFor(aPerformance).type) {
      case "tragedy":
        result = 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;
      case "comedy":
        result = 3000;
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20);
        }
        result += 300 * aPerformance.audience;
        break;
      default:
        throw new Error(`unknown type: ${playFor(aPerformance).type}`);
    }

    return result;
  }

  function volumeCreditsFor(aPerformance) {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);

    if ("comedy" === playFor(aPerformance).type)
      result += Math.floor(aPerformance.audience / 5);

    return result;
  }

  function usd(aNumber) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2
    }).format(aNumber);
  }

  function totalVolumeCredits() {
    let result = 0;
    for (let perf of invoice.performances) {
      result += volumeCreditsFor(perf);
    }

    return result;
  }

  let totalAmount = 0;
  let result = `Statement for ${invoice.customer}\n`;
  for (let perf of invoice.performances) {
    result += ` ${playFor(perf).name}: ${usd(amoutFor(perf) / 100)} (${
      perf.audience
    }) seat \n`;
    totalAmount += amoutFor(perf);
  }

  result += `Amount owed is ${usd(totalAmount / 100)}\n`;
  result += `You earned ${totalVolumeCredits()} credits \n`;

  return result;
}

const playJson = {
  hamlet: { name: "Hamlet", type: "tragedy" },
  "as−like": { name: "As You Like It", type: "comedy" },
  othello: { name: "Othello", type: "tragedy" }
};

const invoicesJson = {
  customer: "BigCo",
  performances: [
    { playID: "hamlet", audience: 55 },
    { playID: "as−like", audience: 35 },
    { playID: "othello", audience: 40 }
  ]
};

console.log(statement(invoicesJson, playJson));
