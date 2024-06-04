# developer-logs

A Node.js utility method for logging with environment-based states and colorful output. This utility allows tralse developers to log messages in different colors and formats based on the current environment configuration.

## Features

- Log messages in different colors (blue, green, red, magenta are the colors that are only supported in this version).
- Conditional logging based on environment variables.

## Installation

To install the package, you can use npm:

```bash
npm install colorful-logger
```

## Usage

### Setup Environment Variables

Ensure you have a .env file in your project root with the following content:

- If you are in development mode

```env
NODE_ENV=development
```

- If you are in debug mode

```env
NODE_ENV=development
DEV_MODE=debug
```

- If you are in production mode

```env
NODE_ENV=production
```

### Usage of Logger

Here's how to use logger.

```javascript
import dotenv from "dotenv";
import { log } from "@tralse/developer-logs";

dotenv.config();

// Note that these logs can be printed when the process.env.NODE_ENV is set up to `development`.

// Logs in blue, and uses default header.
log.blue("This is a blue message");

// Logs in green, and uses header CustomHeader
log.green("This is a green message", "CustomHeader");

// Logs in red with a header CustomHeader, but only executes when DEV_MODE is set to debug.
log.red("This is a red message", "CustomHeader", "DEBUGMODE");

// Logs in magenta, uses default header.
log.magenta("This is a magenta message");
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License.
