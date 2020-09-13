
// Open to extesion and Close to modification
//
// Closed to modification menas that once you are happy
// with a class and it passes all test, you should effectively seal and
// it and avoid modification
//
// What about new functionality?
// Add functionality by extending ..
// keep your code as dry as possible.
//
//


export class ErrorHandler {
  private messageBox: string;
  constructor(messageBox: string) {
    this.messageBox = messageBox;
  }

  wrapError(err, publicResponse, severity) {
    let error = {
      originalError: err,
      publicResponse,
      severity
    }
    if(severity < 5) {
      this.handleWarning("Warning", publicResponse);
    }
    else {
      this.handlerError("Critical Error", publicResponse);
    }
  }

  private handleWarning(header, content) {
    this.messageBox.show(header, content);
  }

  private handlerError(header, content) {
    this.messageBox.show(header, content)
  }
}
//============>============>
//Add a logger 
  // Inject an HttpClient
  // Log error to our server


export class ErrorLogger {
  private _endpoint: string = "api/log";
  constructor(private _httpClient) {

  }

  logError(errorObject) {
    this._httpClient.post(this._endpoint, errorObject);
  }
}


export class ErrorHandlerWithLogging extends ErrorHandler {
  private _logger: ErrorLogger;

  constructor(messageBox, httpClient, logger: ErrorLogger) {
    super(messageBox, httpClient);
    this._logger = logger;
  }

  wrapError(err, publicResponse, severity) {
    this._logger.logError(err).then(() => {
      super.wrapError(err, publicResponse, severity);
    }
  }

}

