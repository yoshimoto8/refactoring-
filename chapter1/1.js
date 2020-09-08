function statement(invoice, plays) {
    var totalAmount = 0;
    var volumeCredits = 0;
    var result = "Statement for " + invoice.customer + "\n";
    var format = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2
    }).format;
    for (var _i = 0, _a = invoice.performances; _i < _a.length; _i++) {
        var perf = _a[_i];
        var play = plays[perf.playID];
        console.log(play);
        var thisAmount = 0;
        switch (play.type) {
            case "tragedy":
                thisAmount = 40000;
                if (perf.audience > 30) {
                    thisAmount += 1000 * (perf.audience - 30);
                }
                break;
            case "comedy":
                thisAmount = 3000;
                if (perf.audience > 20) {
                    thisAmount += 10000 + 500 * (perf.audience - 20);
                }
                thisAmount += 300 * perf.audience;
                break;
            default:
                throw new Error("unknown type: " + play.type);
        }
        volumeCredits += Math.max(perf.audience - 30, 0);
        if ("comedy" === play.type)
            volumeCredits += Math.floor(perf.audience / 5);
        result += " " + play.name + ": " + format(thisAmount / 100) + " (" + perf.audience + " seats)\n";
        totalAmount += thisAmount;
    }
    result += "Amount owed is " + format(totalAmount / 100) + "\n";
    result += "You earned " + volumeCredits + " credits \n";
    return result;
}
var playJson = {
    hamlet: { name: "Hamlet", type: "tragedy" },
    "as−like": { name: "As You Like It", type: "comedy" },
    othello: { name: "Othello", type: "tragedy" }
};
var invoicesJson = {
    customer: "BigCo",
    performances: [
        { playID: "hamlet", audience: 55 },
        { playID: "as−like", audience: 35 },
        { playID: "othello", audience: 40 },
    ]
};
console.log(statement(invoicesJson, playJson));
