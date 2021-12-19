import {BufferJS} from "../src/BufferJS";

describe('DECODING and ENCODING test', () => {
    it('encoding', function () {
        let buffer = new BufferJS();
        buffer.writeInt(39);
        buffer.writeDouble(4.5);
        buffer.writeString("Yooo");
        buffer.writeShort(5);
        buffer.writeBool(false);
    }),
    it('decoding', function () {
        let buffer = new BufferJS();
        buffer.writeInt(64);
        buffer.writeDouble(3.6);
        buffer.writeString("Heyy :D");
        buffer.writeShort(9);
        buffer.writeBool(true);

        buffer.flip();
        console.log(buffer.readInt());
        console.log(buffer.readDouble());
        console.log(buffer.readString());
        console.log(buffer.readShort());
        console.log(buffer.readBool());
    })
});