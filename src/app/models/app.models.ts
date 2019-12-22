/* User model */
/*
Java MVC desing 

entities(model) => list of field names

controller => it controls all the methods in service impl
Service => interface => only method declaration
serviceimpl =>implmentation loginc goes here


*/
export interface User {
    userName: string;
    password: string;
}
/* Tranaction model */
export interface Tranaction {
    accountId: number;
    payeeAccountNumber: number;
    remarks: string;
    transferAmount: number;
}

/* Transaction summary model */
export interface Summary {
    userAccountId: number;
    transactionType: string;
    transactionDate: string;
    transactionAmount: number;
    currentBalance: number;
}

/* Registration form model */
export interface Registration {
    address1: string;
    address2: string;
    dob: string;
    emailAddress: string;
    firstName: string;
    lastName: string;
    panNumber: string;
    phone: string;
    pinCode: string;
}

/* success response model */
export interface SuccessResponse {
    statusCode: number;
    status: string;
    message: string;

}

export interface USERSESSION {
    userName: string;
}

export interface ACCOUNTSEARCH {
    message: string;
    statusCode: number;
    userAccounts: USERACCOUNTS;
}

export interface USERACCOUNTS {
    accountNumber: string;
    accountType: string;
    userName: string;
    accountId: number;
}

export interface MARTAGEACCOUNTRESPONSE {
    status: string;
    statusCode: number;
    message: string;

}
export interface LISTPAYEERESPONSE {
    message: string;
    statusCode: number;
    payees: LISTPAYEE[];
}

export interface LISTPAYEE {
    payeeId: number;
    accountNumber: string;
    payeeNickName: string;
    bankName: string;
    branchName: string;
    isFavorite: string;
}

export interface IFSCCODERESPONSE {
    message: string;
    statusCode: number;
    ifscCode: IFSCCODE;
}

export interface IFSCCODE {
    ifscCode: string;
    bankName: string;
    branchName: string;
}

export interface ADDPAYEEREQUEST {
    accountNumber: number;
    customerId: number;
    ifscCode: string;
    isFavorite: string;
    nickName: string;
}
