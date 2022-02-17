import { expect } from "chai";
import { BufferHexDump } from "./buffer-hex-dump";

describe("BufferHexDump", function()
{
    it("should dump content of the buffer with no styling", function()
    {
        const data = Buffer.alloc(56);

        data.writeUInt32BE(0xf718dc1c);
        data.writeUInt32BE(0xad036ca5, 4);
        data.writeUInt32BE(0x043a8a23, 8);
        data.writeUInt32BE(0x03900e15, 12);
        data.writeUInt32BE(0xd10acaa6, 16);
        data.write("buffer-hex-dump!", 20);
        data.writeUInt32BE(0xef8445b5, 36);
        data.writeUInt32BE(0x0a7cc7eb, 40);
        data.writeUInt32BE(0x7c8ff325, 44);
        data.writeUInt32BE(0xb1d822d1, 48);
        data.writeUInt32BE(0x874930f1, 52);

        const output = BufferHexDump.dump(data);
        console.log(output);

        expect(output).to.be.equal(
            "0000:0000 | F7 18 DC 1C  AD 03 6C A5  04 3A 8A 23  03 90 0E 15  D1 0A CA A6 | [2m····[22m [2m··[22ml[2m·[22m [2m·[22m:[2m·[22m# [2m····[22m [2m····[22m\n" +
            "0000:0014 | 62 75 66 66  65 72 2D 68  65 78 2D 64  75 6D 70 21  EF 84 45 B5 | buff er-h ex-d ump! [2m··[22mE[2m·[22m\n" +
            "0000:0028 | 0A 7C C7 EB  7C 8F F3 25  B1 D8 22 D1  87 49 30 F1              | [2m·[22m|[2m··[22m |[2m··[22m% [2m··[22m\"[2m·[22m [2m·[22mI0[2m·[22m     \n"
        );
    });
});
