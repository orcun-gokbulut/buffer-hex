<h1 align="center">Buffer-Hex-Dump</h1>
<p>
  <a href="https://www.npmjs.com/package/buffer-hex-dump" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/buffer-hex-dump.svg">
  </a>
  <a href="https://github.com/orcun-gokbulut/buffer-hex-dump#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/orcun-gokbulut/buffer-hex-dump/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/orcun-gokbulut/buffer-hex-dump/blob/master/LICENSE" target="_blank">
    <img alt="License: GPL--3.0" src="https://img.shields.io/github/license/orcun-gokbulut/buffer-hex-dump" />
  </a>
</p>

Buffer-Hex-dump is a highly configurable and feature rich utility function package that generates hex dumps of Buffer objects.

**Sample Output:**
```raw
0000:0000 | 97 00 00 00  00 00 00 2E  00 51 00 44  00 65 00 63  00 6C 00 61 | ···· ···. ·Q·D ·e·c ·l·a
0000:0014 | 00 72 00 61  00 74 00 69  00 76 00 65  00 44 00 65  00 62 00 75 | ·r·a ·t·i ·v·e ·D·e ·b·u
0000:0028 | 00 67 00 53  00 65 00 72  00 76 00 65  00 72 00 00  00 00 00 00 | ·g·S ·e·r ·v·e ·r·· ····
0000:003C | 00 01 00 00  00 03 00 00  00 14 00 56  00 38 00 44  00 65 00 62 | ···· ···· ···V ·8·D ·e·b
0000:0050 | 00 75 00 67  00 67 00 65  00 72 00 00  00 16 00 51  00 6D 00 6C | ·u·g ·g·e ·r·· ···Q ·m·l
0000:0064 | 00 44 00 65  00 62 00 75  00 67 00 67  00 65 00 72  00 00 00 1A | ·D·e ·b·u ·g·g ·e·r ····
0000:0078 | 00 44 00 65  00 62 00 75  00 67 00 4D  00 65 00 73  00 73 00 61 | ·D·e ·b·u ·g·M ·e·s ·s·a
0000:008C | 00 67 00 65  00 73 00 00  00 0C 00                              | ·g·e ·s·· ···           
```

Output is divided into 3 section; offset, hex and text.

**Offset Section** (texts like 0000:0078) contains offset of the first byte of current row in buffer.

**Hex Section** (texts like 00 44 00 65  00 62 00 75) contains hexadecimal outputs of the bytes contained in this row.

**Text Section** (the last section) contains ascii output of the bytes contained in current row. However if a byte cannot be displayed properly than placeholder character called unreaderable character (can be changed by BufferHexDumpOptions.textUnrenderableCharacter. Default is '·') is displated.

Bytes can be combined into words and words can be grouped into groups. BufferHexDumpOptions.wordSize and BufferHexDumpOptions.groupSize options control word and bytes size.

For example byte sequence 00 44 00 65 00 62 00 75 00 67 00 4D 00 65 00 73;

Can be displayed as 16 bit word size (BufferHexDumpOptions.wordSize = 2) and without grouping (BufferHexDumpOptions.groupSize = 0);
```
0044 0065 0062 0075 0067 004D 0065 0073
```

Also can be displayed as 8 bit word size (BufferHexDumpOptions.wordSize = 1) and grouped by 4 words (BufferHexDumpOptions.groupSize = 4).
```raw
00 44 00 65  00 62 00 75  00 67 00 4D  00 65 00 73
```

# Install

```sh
npm install hex-dump
```

# Simple Usage
Simple usage with default options. Just call hexDump function with a buffer as a parameter.

```typescript
import { BufferHexDump } from "buffer-hex-dump";

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

console.log(hexDump(data));
```

**Output:**
```raw
0000:0000 | F7 18 DC 1C  AD 03 6C A5  04 3A 8A 23  03 90 0E 15  D1 0A CA A6 | ···· ··l· ·:·# ···· ····
0000:0014 | 62 75 66 66  65 72 2D 68  65 78 2D 64  75 6D 70 21  EF 84 45 B5 | buff er-h ex-d ump! ··E·
0000:0028 | 0A 7C C7 EB  7C 8F F3 25  B1 D8 22 D1  87 49 30 F1              | ·|·· |··% ··"· ·I0·
```

# Referance

## BufferHexDump.dump function
```typescript
export declare class BufferHexDump {
    static dump(buffer: Buffer, offset?: number, count?: number, options?: BufferHexDumpOptions): string;
}
```

### Description
Function creates a hexadecimal and output of the buffer contents according to given parameters.

### Parameters
 - **buffer**: Target buffer that will be used to gerenerate hexadecimal output.
 - **offset** *[optional]*: Starting index of the buffer. If not given start of the buffer will be used as start position.
 - **count** *[optional]*: Number of bytes that will be used for output. If not given number of bytes between start possition and end of buffer will be used.
 - **options** *[optional]*: Additional options that controls output style, format, behavior, etc. If not given default options will be used.

### Return
Generated output as string.

## BufferHexDumpOptions Object
```typescript
export interface BufferHexDumpOptions {
    rowSize?: number;
    groupSize?: number;
    wordSize?: number;
    styleEnabled?: boolean;
    uppercase?: boolean;
    newLineCharacter?: string;
    offsetEnabled?: boolean;
    offsetStyle?: Style;
    offsetSeparator?: string;
    offsetHexSeparator?: string;
    offsetHexSeperatorStyle?: Style;
    hexEnabled?: boolean;
    hexUppserCase?: boolean;
    hexWordSeparator?: string;
    hexGroupSeparator?: string;
    hexStyle?: Style;
    hexTextSeparator?: string;
    hexTextSeparatorStyle?: Style;
    textEnabled?: boolean;
    textStyle?: Style;
    textWordSeparator?: string;
    textGroupSeparator?: string;
    textUnrenderableCharacter?: string;
    textUnrenderableCharacterStyle?: Style;
}
```

### Description
BufferHexDumpOptions object contains various options that controls behavior of hexDump function such as wordSize, separator texts, styles (colors, font characteristics) and etc. 

Smart defaults are already enforced when you pass this object to hexDump function. Therefore you can create this object and only define the options that you want to change, then pass it to the hexDump function.

### Members
- **rowSize** *[optional, default: 20]*: Number of bytes will be outputed per row.
- **groupSize** *[optional, default: 4]*: Words per group.
- **wordSize** *[optional, default: 1]*: Word size.
- **styleEnabled** *[optional, default: 4]*: Enable output styles.
- **uppercase** *[optional, default: true]*: Output hex numbers upper case.
- **newLineCharacter** *[optional, default: '\n']*: New line character that will be added at the end of each row.
- **offsetEnabled** *[optional, default: true]*: Enable Offset Section.
- **offsetStyle** *[optional, default: DefaultStyle]*: Style and formatting of Offset Section. (Checkout Style object)
- **offsetSeparator** *[optional, default: ':']*: Character that separates upper and lower 16bits of offset.
- **offsetHexSeparator** *[optional, default: ' | ']*: Separator text between Offset Section and Hex Section.
- **offsetHexSeperatorStyle** *[optional, default: defaultStyle]*: Style of the separator text between Offset Section and Hex Section.
- **hexEnabled** *[optional, default: true]*: Enable Hex Section output.
- **hexWordSeparator** *[optional, default: ' ']*: Separator text that will be used to separate words.
- **hexGroupSeparator** *[optional, default: ' ']*: Separator text that will be used to separate groups.
- **hexStyle** *[optional, default: defaultStyle]*: Style of Hex Section. (Checkout Style object)
- **hexTextSeparator** *[optional, default: ' | ']*: Separator text between Hex Section and Text Section.
- **hexTextSeparatorStyle** *[optional, default: defaultStyle]*: Style of the separator text between Hex Section and Text Section.
- **textEnabled** *[optional, default: true]*: Enable Text Section.
- **textStyle** *[optional, default: defaultStyle]*: Style of the Text Section. (Checkout Style Object)
- **textWordSeparator** *[optional, default: ' ']*: Separator text that will be used to separate words.
- **textGroupSeparator** *[optional, default: ' ']*: Separator text that will be used to separate groups.
- **textUnrenderableCharacter** *[optional, default: '·']*: Placeholder character for unrenderable characters. Such as newline, backspace, null, bell, etc.
- **textUnrenderableCharacterStyle** *[optional, default: dimTextStyle]*: Style of the unrenderable chracters.

## External Structures

- **TerminalColor** Enumerator - (https://github.com/orcun-gokbulut/terminal-styler#terminalcolor-enumerator)
- **TerminalStyle** Interface - (https://github.com/orcun-gokbulut/terminal-styler#terminalstyle-object)

# Advanced Usage Example
Advanced  usage with lots of customization;
```typescript
//Advanced
import { hexDump, BufferHexDumpOptions } from "hex-dump";
import { TerminalColor } from "terminal-style";

function onData(data : Buffer) : void
{
    Log.trace("PacketManager.onData()", [data]);
    Log.debug(() => {
        let hexDumpOptions : BufferHexDumpOptions = {
            hexEnabled: true,
            textEnabled: true,
            wordSize: 1,
            offsetSeparator: ":",
            offsetHexSeparator: "-",
            offsetHexSeperatorStyle:
            {
                backgroundColor: TerminalColor.yellow
            },
            hexTextSeparator: "*",
            hexTextSeparatorStyle:
            {
                backgroundColor: TerminalColor.magenta
            },

            textWordSeparator: "",
            textStyle:
            {
                backgroundColor: TerminalColor.blue,
                foregroundColor: TerminalColor.white
            },
            textUnrenderableCharacterStyle:
            {
                backgroundColor: TerminalColor.blue,
                dim: true
            },
            offsetStyle:
            {
                backgroundColor: TerminalColor.green,
                foregroundColor: TerminalColor.white,
                bold: true
            },
            hexStyle:
            {
                foregroundColor: TerminalColor.white,
                backgroundColor: TerminalColor.red
            }
        };

        return "Raw Data Received:\n" + BufferHexDump.dump(data, undefined, undefined, hexDumpOptions) + "\n";
    }
}
```

# Author

👤 **Y. Orçun GÖKBULUT**

* Github: [@orcun-gokbulut](https://github.com/orcun-gokbulut)
* E-mail: orcun.gokbulut@gmail.com

# 🤝 Contributing
Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/orcun-gokbulut/buffer-hex-dump/issues). You can also take a look at the [contributing guide](https://github.com/orcun-gokbulut/buffer-hex-dump/blob/master/CONTRIBUTING.md).

# 📝 License
Copyright © 2022 [Y. Orçun GÖKBULUT](https://github.com/orcun-gokbulut).<br />
This project is [GPL--3.0](https://github.com/orcun-gokbulut/buffer-hex-dump/blob/master/LICENSE) licensed.
<br>
<br>
