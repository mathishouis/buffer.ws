import {BufferWS} from "../src/BufferWS";

describe('DECODING and ENCODING test', () => {
    it('encoding', function () {
        let buffer = new BufferWS()
            .writeInt(39)
            .writeDouble(4.5)
            .writeString("Yooo")
            .writeShort(5)
            .writeBool(false);
    }),
    it('decoding', function () {
        let buffer = new BufferWS()
            .writeString("céc")
            .writeInt(64)
            .writeDouble(3.6)
            .writeString("state    0    imageUrl    /swf/c_images/room_ads/wl15/wl15_e.png    offsetX    -720    offsetY    190    offsetZ    8700")
            .writeShort(9)
            .writeBool(true)
            .flip();

        console.log(buffer.readString());
        console.log(buffer.readInt());
        console.log(buffer.readDouble());
        console.log(buffer.readString());
        console.log(buffer.readShort());
        console.log(buffer.readBool());
    })
});
