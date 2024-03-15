export class CustomError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class MissingFieldsError extends CustomError {
    constructor() {
        super("All necessary fields have not been filled!!!");
    }
}

export class UserExistsError extends CustomError {
    constructor(message) {
        super(message);
    }
}

export class PasswordNotMatched extends CustomError {
    constructor() {
        super("Please enter right Password!!!");
    }
}

export class InvalidDetails extends CustomError {
    constructor() {
        super("Invalid Username or Email!!!");
    }
}

export class AuthorizationError extends CustomError {
    constructor(msg) {
        super(msg);
    }
}

export class FetchingChatError extends CustomError {
    constructor(msg) {
        super(msg);
    }
}

