import { Injectable, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoggingService implements LoggerService {
  private readonly logsPath: string;
  private readonly fileMaxSize: number;
  private readonly level: number;
  private readonly errorLogsFile: string;
  private readonly appLogsFile: string;

  constructor(private readonly configService: ConfigService) {
    this.level = this.configService.get('LOGS_LEVEL', 2);

    this.fileMaxSize = this.configService.get(
      'LOGS_FILE_MAX_SIZE',
      20 * 1024 * 1024,
    );
    this.logsPath = this.configService.get(
      'LOGS_DIR',
      path.join(__dirname, '../../logs'),
    );

    this.appLogsFile = path.join(this.logsPath, 'app.log');
    this.errorLogsFile = path.join(this.logsPath, 'error.log');

    this.initLogsFile();
  }

  log(message: string) {
    if (this.shouldLog(1)) {
      this.write('LOG', message, this.appLogsFile);
    }
  }

  error(message: string, trace?: string) {
    if (this.shouldLog(0)) {
      this.write('ERROR', message, this.errorLogsFile, trace);
    }
  }

  warn(message: string) {
    if (this.shouldLog(2)) {
      this.write('WARN', message, this.appLogsFile);
    }
  }

  debug(message: string) {
    if (this.shouldLog(3)) {
      this.write('DEBUG', message, this.appLogsFile);
    }
  }

  verbose(message: string) {
    if (this.shouldLog(4)) {
      this.write('VERBOSE', message, this.appLogsFile);
    }
  }

  private initLogsFile() {
    if (!fs.existsSync(this.logsPath)) {
      fs.mkdirSync(this.logsPath, { recursive: true });
    }
  }

  private write(
    type: string,
    message: string,
    filePath: string,
    trace?: string,
  ) {
    const date = new Date().toISOString();
    const logMessage = `[${type}] ${date} => ${message}${
      trace ? ` - ${trace}` : ''
    }\n`;

    this.rotateFile(filePath);
    fs.appendFileSync(filePath, logMessage, 'utf8');

    const formatedMessage = `\x1b[33m[${type}]\x1b[0m \x1b[35m${date}\x1b[0m \x1b[33m=>\x1b[0m ${message}${
      trace ? ` - ${trace}` : ''
    }\n`;
    console.log(formatedMessage);
  }

  private shouldLog(level: number) {
    return level <= this.level;
  }

  private rotateFile(filePath: string) {
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);

      if (stats.size >= this.fileMaxSize) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

        fs.renameSync(filePath, `${filePath}.${timestamp}.log`);
      }
    }
  }
}
