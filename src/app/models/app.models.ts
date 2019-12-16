/* User model */
export interface User {
    userName: string;
    password: string;
}
/* Tranaction model */
export interface Tranaction {
    accountId: number;
    payeeAccountId: number;
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

