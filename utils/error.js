// custom class for error-handling


class ErrorHandler extends Error { // ErrorHandler inherits everything from Error class

    constructor(message, statusCode) {
        super(message); // calls parent class constructor
        this.statusCode = statusCode;
    }

}


export default ErrorHandler;