# buffer.ws

A simple, light and fast bytebuffer implementation under node.js

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Testing](#testing)

## Installation

Install the package:

```
npm i buffer.ws
```

Importing the package with require:

```js

var BufferWS = require("buffer.ws");

```

or with import:

```js

import { BufferWS } from 'buffer.ws';

```

## Usage

Importing the package with require

```js

var BufferWS = require("buffer.ws");

var buffer = new BufferWS()
                .writeInt(39)
                .writeString("Hello!")
                .flip();
console.log(buffer.readInt(), buffer.readString()); // 39 Hello!

```

## Testing

```
npm run test
```