import { Buffer } from 'buffer';

export class DataView {

    private _buffer: Buffer;
    private _byteOffset: number;
    private _byteLength: number;
    private _byteArray: Uint8Array;
    private _cursor: number;
    private _byteEnd: number;

    private _uint8Array: Uint8Array;
    private _int8Array: Int8Array;
    private _int16Array: Int16Array;
    private _int32Array: Int32Array;
    private _float32Array: Float32Array;
    private _float64Array: Float64Array;

    constructor(buffer?: Buffer | Uint8Array, byteOffset?: number, byteLength?: number) {
        this.initCacheArray();
        if (buffer) {
            this.setBuffer(buffer, byteOffset, byteLength);
        } else {
            this._buffer = null;
            this._byteOffset = 0;
            this._byteLength = 0;
            this._byteArray = null;
            this._cursor = 0;
        }
    }

    public initCacheArray(): void {
        const cacheBuffer = new ArrayBuffer(8);
        const uint8Array = new Uint8Array(cacheBuffer);
        const int8Array = new Int8Array(cacheBuffer);
        const int16Array = new Int16Array(cacheBuffer);
        const int32Array = new Int32Array(cacheBuffer);
        const float32Array = new Float32Array(cacheBuffer);
        const float64Array = new Float64Array(cacheBuffer);

        this._uint8Array = uint8Array;
        this._int8Array = int8Array;
        this._int16Array = int16Array;
        this._int32Array = int32Array;
        this._float32Array = float32Array;
        this._float64Array = float64Array;
    };

    public setBuffer(buffer?: Buffer | Uint8Array, byteOffset?: number, byteLength?: number): void {
        // @ts-ignore
        const isByteArray = (buffer instanceof Uint8Array) || buffer.buffer;

        this._byteArray = isByteArray ? buffer : new Uint8Array(buffer);
        // @ts-ignore
        this._buffer = this._byteArray.buffer;

        this.setRange(byteOffset, byteLength);
    };

    public setRange(byteOffset?: number, byteLength?: number): void {
        const bufferSize = this._buffer.byteLength;
        this._byteOffset = Math.min(bufferSize, byteOffset || 0) | 0;

        const maxLength = bufferSize - this._byteOffset;
        this._byteLength = Math.min(maxLength, byteLength || maxLength) | 0;

        this._byteEnd = this._byteOffset + this._byteLength;
        this._cursor = 0;
    };

    // Int8

    public pushInt8(value): void {
        this._byteArray[this._byteOffset + this._cursor++] = value;
    };

    public nextInt8(): number {
        this._uint8Array[0] = this._byteArray[this._byteOffset + this._cursor++];
        return this._int8Array[0];
    };

    // Int16

    public pushInt16(value): void {
        const offset = this._byteOffset + this._cursor;
        this._byteArray[offset] = value >>> 8;
        this._byteArray[offset + 1] = value;
        this._cursor += 2;
    };

    public nextInt16(): number {
        const offset = this._byteOffset + this._cursor;
        this._uint8Array[0] = this._byteArray[offset + 1];
        this._uint8Array[1] = this._byteArray[offset];
        this._cursor += 2;
        return this._int16Array[0];
    };

    // Int32

    public pushInt32(value): void {
        const offset = this._byteOffset + this._cursor;
        this._byteArray[offset] = value >>> 24;
        this._byteArray[offset + 1] = value >>> 16;
        this._byteArray[offset + 2] = value >>> 8;
        this._byteArray[offset + 3] = value;
        this._cursor += 4;
    };

    public nextInt32(): number {
        const offset = this._byteOffset + this._cursor;
        this._uint8Array[0] = this._byteArray[offset + 3];
        this._uint8Array[1] = this._byteArray[offset + 2];
        this._uint8Array[2] = this._byteArray[offset + 1];
        this._uint8Array[3] = this._byteArray[offset];
        this._cursor += 4;
        return this._int32Array[0];
    };

    // Float64

    public pushFloat64(value): void {
        const offset = this._byteOffset + this._cursor;
        this._float64Array[0] = value;
        this._byteArray[offset] = this._uint8Array[7];
        this._byteArray[offset + 1] = this._uint8Array[6];
        this._byteArray[offset + 2] = this._uint8Array[5];
        this._byteArray[offset + 3] = this._uint8Array[4];
        this._byteArray[offset + 4] = this._uint8Array[3];
        this._byteArray[offset + 5] = this._uint8Array[2];
        this._byteArray[offset + 6] = this._uint8Array[1];
        this._byteArray[offset + 7] = this._uint8Array[0];
        this._cursor += 8;
    };

    public nextFloat64(): number {
        const offset = this._byteOffset + this._cursor;
        this._uint8Array[0] = this._byteArray[offset + 7];
        this._uint8Array[1] = this._byteArray[offset + 6];
        this._uint8Array[2] = this._byteArray[offset + 5];
        this._uint8Array[3] = this._byteArray[offset + 4];
        this._uint8Array[4] = this._byteArray[offset + 3];
        this._uint8Array[5] = this._byteArray[offset + 2];
        this._uint8Array[6] = this._byteArray[offset + 1];
        this._uint8Array[7] = this._byteArray[offset];
        this._cursor += 8;
        return this._float64Array[0];
    };

    public flip(): void {
        this._byteOffset = 0;
        this._cursor = 0;
    }

    public getByteArray(): Uint8Array {
        return this._byteArray;
    }
}