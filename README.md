# buffer.js

A simple and fast bytebuffer implementation under node.js

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Testing](#testing)

## Installation

```
npm i @kozennnn/buffer.js
```

## Usage

```js

var BufferIO = require("buffer.io");

var buffer = new BufferIO()
                .writeInt(39)
                .writeString("Hello!")
                .flip();
console.log(buffer.readInt(), buffer.readString()); // 39 Hello!

```

## Testing

```
npm run test
```