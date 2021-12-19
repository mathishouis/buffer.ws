import {DataView} from "./methods/DataView";

export class BufferWS {

    private readonly _dataView: DataView;

    constructor(arraybuffer?: Uint8Array | Buffer) {
        if(arraybuffer == undefined) {
            arraybuffer = new Buffer(64);
        }
        this._dataView = new DataView(arraybuffer, 0);
    }

    public readByte(): number {
        return this._dataView.nextInt8();
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
        let retVal = "";

        for (let i = 0; i < length; i++) retVal += String.fromCharCode(this.readByte());

        return retVal;
    }

    public writeByte(byte: number): this {
        this._dataView.pushInt8(byte);
        return this;
    }

    public writeBool(bool: boolean): this {
        if(bool) this.writeByte(1); else this.writeByte(0);
        return this;
    }

    public writeShort(short: number): this {
        this._dataView.pushInt16(short);
        return this;
    }

    public writeInt(int: number): this {
        this._dataView.pushInt32(int);
        return this;
    }

    public writeDouble(double: number): this {
        this._dataView.pushFloat64(double);
        return this;
    }

    public writeString(string: string): this {
        this._dataView.pushInt16(string.length);
        let bytes = [];
        for (let i = 0; i < string.length; ++i) {
            const code = string.charCodeAt(i);
            bytes = bytes.concat([code]);
            this._dataView.pushInt8(bytes[i]);
        }
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
}