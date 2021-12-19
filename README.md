# buffer.ws

A simple, light and fast bytebuffer implementation under node.js

[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fkozennnn%2Fbuffer.ws&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)
[![Inline docs](https://img.shields.io/npm/dw/buffer.ws)](https://www.npmjs.com/package/buffer.ws)

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Wiki](#wiki)
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

Example:

```js

var BufferWS = require("buffer.ws");

var buffer = new BufferWS()
                .writeInt(39)
                .writeString("Hello!")
                .flip();
console.log(buffer.readInt(), buffer.readString()); // 39 Hello!

```

## Wiki

* [Home](https://github.com/kozennnn/buffer.ws/wiki)
* [Documentation](https://github.com/kozennnn/buffer.ws/wiki/Documentation)

## Testing

```
npm run test
```
