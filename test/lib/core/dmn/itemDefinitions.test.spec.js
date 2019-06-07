const parseString = require('xml2js').parseString;
const fs = require('fs');
const path = require('path');
const { expect } = require('chai');
const chalk = require('chalk');

const { getDecisions, getInputData, getItemDefinitions } = require('../../../../lib/core/dmn/index');

describe(chalk.blue('validating the itemDefinitions'), () => {

    const readDmnFile = (fileName) => {
        var xml = fs.readFileSync(path.resolve(__dirname, `./data/${fileName}`), 'utf8');
        return new Promise((resolve, reject) => {
            parseString(xml, { trim: true }, function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    }


    it('should return the correct itemDefintion for 001-input-datastring.dmn', function (done) {
        readDmnFile('001-input-datastring.dmn')
            .then((data) => {
                let itemDefs = getItemDefinitions(data);
                let expected = [
                    {
                        "name": "tfullName",
                        "isCollection": "false",
                        "typeRef": undefined,
                        "itemComponent": [
                            {
                                "name": "b",
                                "isCollection": "false",
                                "typeRef": undefined,
                                "itemComponent": [
                                    {
                                        "name": "c",
                                        "typeRef": "string",
                                        "isCollection": "false"
                                    }
                                ]
                            }
                        ]
                    }
                ];

                expect(itemDefs).to.deep.equal(expected);
                done();
            })
            .catch(done)
    });

    it('should return the correct itemDefintion for 0003-input-data-string-allowed-values.dmn', function (done) {
        readDmnFile('0003-input-data-string-allowed-values.dmn')
            .then((data) => {
                let itemDefs = getItemDefinitions(data);
                let expected = [
                    {
                        "name": "tEmploymentStatus",
                        "isCollection": undefined,
                        "typeRef": "string",
                        "itemComponent": []
                    }
                ];
                expect(itemDefs).to.deep.equal(expected);
                done();
            })
            .catch(done)
    });

    it('should return the correct itemDefintion for 0003-iteration.dmn', function (done) {
        readDmnFile('0003-iteration.dmn')
            .then((data) => {
                let itemDefs = getItemDefinitions(data);
                let expected = [
                    {
                        "name": "tLoan",
                        "isCollection": "false",
                        "typeRef": undefined,
                        "itemComponent": [
                            {
                                "name": "amount",
                                "typeRef": "number",
                                "isCollection": "false",
                            },
                            {
                                "name": "rate",
                                "typeRef": "number",
                                "isCollection": "false",
                            },
                            {
                                "name": "term",
                                "typeRef": "number",
                                "isCollection": "false",
                            }
                        ]
                    },
                    {
                        "name": "tLoanList",
                        "isCollection": "true",
                        "typeRef": "tLoan",
                        "itemComponent": []
                    },
                    {
                        "name": "tMonthlyPaymentList",
                        "isCollection": "true",
                        "typeRef": "number",
                        "itemComponent": []
                    }
                ];

                expect(itemDefs).to.deep.equal(expected);
                done();
            })
            .catch(done)
    });

    it('should return the correct itemDefintion for 0004-lending.dmn', function (done) {
        readDmnFile('0004-lending.dmn')
            .then((data) => {
                let itemDefs = getItemDefinitions(data);
                let expected = [
                    {
                        "name": "tEligibility",
                        "isCollection": "false",
                        "typeRef": "string",
                        "itemComponent": []
                    },
                    {
                        "name": "tBureauCallType",
                        "isCollection": "false",
                        "typeRef": "string",
                        "itemComponent": []
                    },
                    {
                        "name": "tStrategy",
                        "isCollection": "false",
                        "typeRef": "string",
                        "itemComponent": []
                    },
                    {
                        "name": "tRiskCategory",
                        "isCollection": "false",
                        "typeRef": "string",
                        "itemComponent": []
                    },
                    {
                        "name": "tRouting",
                        "isCollection": "false",
                        "typeRef": "string",
                        "itemComponent": []
                    },
                    {
                        "name": "tBureauData",
                        "isCollection": "false",
                        "typeRef": undefined,
                        "itemComponent": [
                            {
                                "name": "CreditScore",
                                "typeRef": "number",
                                "isCollection": "false",
                            },
                            {
                                "name": "Bankrupt",
                                "typeRef": "boolean",
                                "isCollection": "false",
                            }
                        ]
                    },
                    {
                        "name": "tAdjudication",
                        "isCollection": "false",
                        "typeRef": "string",
                        "itemComponent": []
                    },
                    {
                        "name": "tApplicantData",
                        "isCollection": "false",
                        "typeRef": undefined,
                        "itemComponent": [
                            {
                                "name": "Monthly",
                                "typeRef": undefined,
                                "isCollection": "false",
                                "itemComponent": [
                                    {
                                        "name": "Income",
                                        "typeRef": "number",
                                        "isCollection": "false",
                                    },
                                    {
                                        "name": "Expenses",
                                        "typeRef": "number",
                                        "isCollection": "false",
                                    },
                                    {
                                        "name": "Repayments",
                                        "typeRef": "number",
                                        "isCollection": "false",
                                    },
                                ]
                            },
                            {
                                "name": "Age",
                                "typeRef": "number",
                                "isCollection": "false",
                            },
                            {
                                "name": "ExistingCustomer",
                                "typeRef": "boolean",
                                "isCollection": "false",
                            },
                            {
                                "name": "MaritalStatus",
                                "typeRef": "string",
                                "isCollection": "false",
                            },
                            {
                                "name": "EmploymentStatus",
                                "typeRef": "string",
                                "isCollection": "false",
                            }
                        ]
                    },
                    {
                        "name": "tRequestedProduct",
                        "isCollection": "false",
                        "typeRef": undefined,
                        "itemComponent": [
                            {
                                "name": "ProductType",
                                "typeRef": "string",
                                "isCollection": "false",
                            },
                            {
                                "name": "Amount",
                                "typeRef": "number",
                                "isCollection": "false",
                            },
                            {
                                "name": "Rate",
                                "typeRef": "number",
                                "isCollection": "false",
                            },
                            {
                                "name": "Term",
                                "typeRef": "number",
                                "isCollection": "false",
                            },
                        ]
                    }
                ];

                expect(itemDefs).to.deep.equal(expected);
                done();
            })
            .catch(done)
    });

    it('should return the correct itemDefintion for 0008-LX-arithmetic.dmn', function (done) {
        readDmnFile('0008-LX-arithmetic.dmn')
            .then((data) => {
                let itemDefs = getItemDefinitions(data);
                let expected = [
                    {
                        "name": "tLoan",
                        "isCollection": "false",
                        "typeRef": undefined,
                        "itemComponent": [
                            {
                                "name": "principal",
                                "typeRef": "number",
                                "isCollection": "false",
                            },
                            {
                                "name": "rate",
                                "typeRef": "number",
                                "isCollection": "false",
                            },
                            {
                                "name": "termMonths",
                                "typeRef": "number",
                                "isCollection": "false",
                            }
                        ]
                    }
                ];

                expect(itemDefs).to.deep.equal(expected);
                done();
            })
            .catch(done)
    });

    it('should return the correct itemDefintion for 0014-loan-comparison.dmn', function (done) {
        readDmnFile('0014-loan-comparison.dmn')
            .then((data) => {
                let itemDefs = getItemDefinitions(data);
                let expected = [
                    {
                        "name": "tLoanProduct",
                        "isCollection": undefined,
                        "typeRef": undefined,
                        "itemComponent": [
                            {
                                "name": "lenderName",
                                "typeRef": "string",
                                "isCollection": undefined,
                            },
                            {
                                "name": "rate",
                                "typeRef": "number",
                                "isCollection": undefined,
                            },
                            {
                                "name": "points",
                                "typeRef": "number",
                                "isCollection": undefined,
                            },
                            {
                                "name": "fee",
                                "typeRef": "number",
                                "isCollection": undefined,
                            }
                        ]
                    },
                    {
                        "name": "tLoanTable",
                        "isCollection": "true",
                        "typeRef": "tLoanProduct",
                        "itemComponent": []
                    },
                    {
                        "name": "tMetric",
                        "isCollection": undefined,
                        "typeRef": undefined,
                        "itemComponent": [
                            {
                                "name": "lenderName",
                                "typeRef": "string",
                                "isCollection": undefined,
                            },
                            {
                                "name": "rate",
                                "typeRef": "number",
                                "isCollection": undefined,
                            },
                            {
                                "name": "points",
                                "typeRef": "number",
                                "isCollection": undefined,
                            },
                            {
                                "name": "fee",
                                "typeRef": "number",
                                "isCollection": undefined,
                            },
                            {
                                "name": "loanAmt",
                                "typeRef": "number",
                                "isCollection": undefined,
                            },
                            {
                                "name": "downPmtAmt",
                                "typeRef": "number",
                                "isCollection": undefined,
                            },
                            {
                                "name": "paymentAmt",
                                "typeRef": "number",
                                "isCollection": undefined,
                            },
                            {
                                "name": "equity36moPct",
                                "typeRef": "number",
                                "isCollection": undefined,
                            }
                        ]
                    },
                    {
                        "name": "tMetrics",
                        "isCollection": "true",
                        "typeRef": "tMetric",
                        "itemComponent": []
                    },
                    {
                        "name": "tRankedProducts",
                        "isCollection": undefined,
                        "typeRef": undefined,
                        "itemComponent": [
                            {
                                "name": "metricsTable",
                                "typeRef": "tMetrics",
                                "isCollection": undefined,
                            },
                            {
                                "name": "rankByRate",
                                "typeRef": "tMetrics",
                                "isCollection": undefined,
                            },
                            {
                                "name": "rankByDownPmt",
                                "typeRef": "tMetrics",
                                "isCollection": undefined,
                            },
                            {
                                "name": "rankByMonthlyPmt",
                                "typeRef": "tMetrics",
                                "isCollection": undefined,
                            },
                            {
                                "name": "rankByEquityPct",
                                "typeRef": "tMetrics",
                                "isCollection": undefined,
                            }
                        ]
                    }
                ];

                expect(itemDefs).to.deep.equal(expected);
                done();
            })
            .catch(done)
    });




});