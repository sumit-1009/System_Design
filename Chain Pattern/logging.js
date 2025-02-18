class Logger{
    constructor(){
        this.nextHandler = null;
    }
    setNextHandler(nextHandler){
        this.nextHandler = nextHandler;
    }
    loggedMessage(level, message){
        this.nextHandler.loggedMessage(level, message);
    }
}
class ConsoleLogger extends Logger{
    loggedMessage(level, message){
        if(level === 'INFO' || level === 'WARN' || level === 'ERROR'){
            console.log(`Console ${level} , ${message}`);
        }
        else if(this.nextHandler){
            this.nextHandler.loggedMessage(level, message);
        }
    }
}
class FileLogger extends Logger {
  loggedMessage(level, message) {
    if (level === "WARN" || level === "ERROR") {
      console.log(`Console ${level} , ${message}`);
    } else if (this.nextHandler) {
      this.nextHandler.loggedMessage(level, message);
    }
  }
}
class RemoteLogger extends Logger {
  loggedMessage(level, message) {
    if (level === "ERROR") {
      console.log(`Console ${level} , ${message}`);
    } else if (this.nextHandler) {
      this.nextHandler.loggedMessage(level, message);
    }
  }
}
let consoleLogger = new ConsoleLogger();
let fileLogger = new FileLogger();
let remoteLogger = new RemoteLogger();
consoleLogger.setNextHandler(fileLogger);
fileLogger.setNextHandler(remoteLogger);
consoleLogger.loggedMessage('INFO', 'This is a console message');
fileLogger.loggedMessage("WARN", "This is a file message");
remoteLogger.loggedMessage("ERROR", "This is a remote message");