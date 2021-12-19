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

    public writeByte(byte: number): void {
        this._dataView.pushInt8(byte);
    }

    public writeBool(bool: boolean): void {
        if(bool) this.writeByte(1); else this.writeByte(0);
    }

    public writeShort(short: number): void {
        this._dataView.pushInt16(short);
    }

    public writeInt(int: number): void {
        this._dataView.pushInt32(int);
    }

    public writeDouble(double: number): void {
        this._dataView.pushFloat64(double);
    }

    public writeString(string: string): void {
        this._dataView.pushInt16(string.length);
        let bytes = [];
        for (let i = 0; i < string.length; ++i) {
            const code = string.charCodeAt(i);
            bytes = bytes.concat([code]);
            this._dataView.pushInt8(bytes[i]);
        }
    }

    public flip(): void {
        this._dataView.flip();
    }

    public getByteArray(): Uint8Array {
        return this._dataView.getByteArray();
    }
}