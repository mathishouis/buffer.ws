import { Buffer } from 'buffer';
import { DataView } from "./methods/DataView";

export class BufferWS {

    private readonly _dataView: DataView;

    constructor(arraybuffer?: Uint8Array | Buffer) {
        if(arraybuffer == undefined) {
            arraybuffer = new Buffer(0);
        }
        this._dataView = new DataView(arraybuffer, 0);
    }

    public readByte(): number {
        return this._dataView.nextInt8();
    }

    public readBytes(length: number): BufferWS
    {
        const buffer = new BufferWS(this._dataView.getByteArray().slice(this._dataView.position, this._dataView.position + length));
        this._dataView.position += length;
        return buffer;
    }

    public readBool(): boolean {
        return this.readByte() === 1;
    }

    public readShort(): number {
        return this._dataView.nextInt16();
    }

    public readInt(): number {
        return this._dataView.nextInt32();
    }

    public readDouble(): number {
        return this._dataView.nextFloat64();
    }

    public readString(): string {
        const length = this.readShort();
        const buffer = this.readBytes(length);
        return new TextDecoder('utf-8').decode(buffer.getByteArray());
    }

    public writeByte(byte: number): this {
        if (!this.isEnoughAllocatedBytes(1)) this.allocateMemory(this.getRequiredLength(1));
        this._dataView.pushInt8(byte);
        return this;
    }

    public writeBool(bool: boolean): this {
        if(bool) this.writeByte(1); else this.writeByte(0);
        return this;
    }

    public writeShort(short: number): this {
        if (!this.isEnoughAllocatedBytes(2)) this.allocateMemory(this.getRequiredLength(2));
        this._dataView.pushInt16(short);
        return this;
    }

    public writeInt(int: number): this {
        if (!this.isEnoughAllocatedBytes(4)) this.allocateMemory(this.getRequiredLength(4));
        this._dataView.pushInt32(int);
        return this;
    }

    public writeDouble(double: number): this {
        if (!this.isEnoughAllocatedBytes(8)) this.allocateMemory(this.getRequiredLength(8));
        this._dataView.pushFloat64(double);
        return this;
    }

    public writeString(string: string, includeLength: boolean = true): this {
        const encodedString = new TextEncoder().encode(string);
        if (!this.isEnoughAllocatedBytes(encodedString.length + 2)) this.allocateMemory(this.getRequiredLength(encodedString.length + 2));
        if (includeLength) this._dataView.pushInt16(encodedString.length);
        encodedString.forEach((value: number) => {
            this._dataView.pushInt8(value);
        });
        return this;
    }

    public flip(): this {
        this._dataView.flip();
        return this;
    }

    public getByteArray(): Uint8Array {
        return this._dataView.getByteArray();
    }

    public getBuffer(): Buffer {
        return new Buffer(this.getByteArray());
    }

    public isEnoughAllocatedBytes(size: number): boolean {
        return this._dataView.position + size < this.getBuffer().byteLength;
    }

    public getRequiredLength(size: number): number {
        const length: number = size + this._dataView.position;
        return length > 0 ? length : 0;
    }

    public allocateMemory(size: number): void {
        if(size < 1) return;
        const newBuffer = new Uint8Array(size);
        newBuffer.set(new Uint8Array(this.getBuffer()), 0);
        this._dataView.buffer = newBuffer;
    }

    public getBytesAvailable(): number {
        return this.getBuffer().byteLength - this._dataView.position;
    }
}
