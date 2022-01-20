<h1 align="center">Buffer-Hex-Dump</h1>
<p>
  <a href="https://www.npmjs.com/package/hex-dump" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/hex-dump.svg">
  </a>
  <a href="https://github.com/orcun-gokbulut/hex-dump#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/orcun-gokbulut/hex-dump/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/orcun-gokbulut/hex-dump/blob/master/LICENSE" target="_blank">
    <img alt="License: GPL--3.0" src="https://img.shields.io/github/license/orcun-gokbulut/hex-dump" />
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

**Text Section** (the last section) contains ascii output of the bytes contained in current row. However if a byte cannot be displayed properly than placeholder character called unreaderable character (can be changed by Options.textUnrenderableCharacter. Default is '·') is displated.

Bytes can be combined into words and words can be grouped into groups. Options.wordSize and Options.groupSize options control word and bytes size.

For example byte sequence 00 44 00 65 00 62 00 75 00 67 00 4D 00 65 00 73;

Can be displayed as 16 bit word size (Options.wordSize = 2) and without grouping (Options.groupSize = 0);
```
0044 0065 0062 0075 0067 004D 0065 0073
```

Also can be displayed as 8 bit word size (Options.wordSize = 1) and grouped by 4 words (Options.groupSize = 4).
```raw
00 44 00 65  00 62 00 75  00 67 00 4D  00 65 00 73
```

## Install

```sh
npm install hex-dump
```

```typescript
import { hexDump} from "hex-dump";
```

## Simple Usage
Simple usage with default options. Just call hexDump function with a buffer as a parameter.

```typescript
//Simple Usage
import { hexDump } from "hex-dump";

function onData(data : Buffer) : void
{
    cosole.log(hexDump(data));
}
```

## Referance

### hexDump function
```typescript
export declare function hexDump(buffer: Buffer, offset?: number, count?: number, options?: Options): string;
```
#### Description
Function creates a hexadecimal and output of the buffer contents according to given parameters.

#### Parameters
**buffer**: Target buffer that will be used to gerenerate hexadecimal output.

**offset** [optional]: Starting index of the buffer. If not given start of the buffer will be used as start position.

**count** [optional]: Number of bytes that will be used for output. If not given number of bytes between start possition and end of buffer will be used.

**options** [optional]: Additional options that controls output style, format, behavior, etc. If not given default options will be used.

#### Return
Generated output as string.

### Options Object
```typescript
export interface Options {
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

#### Description
Options object contains various options that controls behavior of hexDump function such as wordSize, separator texts, styles (colors, font characteristics) and etc. 

Smart defaults are already enforced when you pass this object to hexDump function. Therefore you can create this object and only define the options that you want to change, then pass it to the hexDump function.

#### Members
*rowSize* [optional, default: 20]: Number of bytes will be outputed per row.

*groupSize* [optional, default: 4]: Words per group.

*wordSize* [optional, default: 1]: Word size.

*styleEnabled* [optional, default: 4]: Enable output styles.

*uppercase* [optional, default: true]: Output hex numbers upper case.

*newLineCharacter* [optional, default: '\n']: New line character that will be added at the end of each row.

*offsetEnabled* [optional, default: true]: Enable Offset Section.

*offsetStyle* [optional, default: DefaultStyle]: Style and formatting of Offset Section. (Checkout Style object)

*offsetSeparator* [optional, default: ':']: Character that separates upper and lower 16bits of offset.

*offsetHexSeparator* [optional, default: ' | ']: Separator text between Offset Section and Hex Section.

*offsetHexSeperatorStyle* [optional, default: defaultStyle]: Style of the separator text between Offset Section and Hex Section.

*hexEnabled* [optional, default: true]: Enable Hex Section output.

*hexWordSeparator* [optional, default: ' ']: Separator text that will be used to separate words.

*hexGroupSeparator* [optional, default: ' ']: Separator text that will be used to separate groups.

*hexStyle* [optional, default: defaultStyle]: Style of Hex Section. (Checkout Style object)

*hexTextSeparator* [optional, default: ' | ']: Separator text between Hex Section and Text Section.

*hexTextSeparatorStyle* [optional, default: defaultStyle]: Style of the separator text between Hex Section and Text Section.

*textEnabled* [optional, default: true]: Enable Text Section.

*textStyle* [optional, default: defaultStyle]: Style of the Text Section. (Checkout Style Object)

*textWordSeparator* [optional, default: ' ']: Separator text that will be used to separate words.

*textGroupSeparator* [optional, default: ' ']: Separator text that will be used to separate groups.

*textUnrenderableCharacter* [optional, default: '·']: Placeholder character for unrenderable characters. Such as newline, backspace, null, bell, etc.

*textUnrenderableCharacterStyle* [optional, default: dimTextStyle]: Style of the unrenderable chracters.

### Color enumurator
```typescript
export enum Color
{
    default = -1,
    black   = 0,
    red     = 1,
    green   = 2,
    yellow  = 3,
    blue    = 4,
    magenta = 5,
    cyan    = 6,
    white   = 7,
    gray    = 8
};
```

#### Description
Color enumerator which is used in Style object. Default value means do not change current terminal color use it instead.

### Style object
```typescript
export interface Style {
    foregroundColor?: Color;
    backgroundColor?: Color;
    dim?: boolean;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strike?: boolean;
    inverse?: boolean;
}
```

#### Description
Style object describes how to style and format (font attributes, colors) output. It is used in Options object for various setting style and format of various output elements.

Smart defaults are already enforced when you pass this object to one of Options objects property. Therefore you can create this object and only define the options that you want to change, then assign it to one of the Options objects property.

#### Members

*foregroundColor* [optional, dont change]: Sets text color of the output.

*backgroundColor* [optional, default: dont change]: Sets backgroud color of the output.

*dim* [optional, default: false]: Darkens text color of the output.

*bold* [optional, default: false]: Sets output **bold**.

*underline* [optional, default: false]: Sets output <u>underlined</u>.

*strike* [optional, default: false]: Sets output ~~strikethroughed~~.

*inverse* [optional, default: false]: Inverts color of the output.

## Advanced Usage Example
Advanced  usage with lots of customization;
```typescript
//Advanced
import { Color, hexDump, Options } from "hex-dump";

function onData(data : Buffer) : void
{
    Log.trace("PacketManager.onData()", [data]);
    Log.debug(() => {
        let hexDumpOptions : Options = {
            hexEnabled: true,
            textEnabled: true,
            wordSize: 1,
            offsetSeparator: ":",
            offsetHexSeparator: "-",
            offsetHexSeperatorStyle:
            {
                backgroundColor: Color.yellow
            },
            hexTextSeparator: "*",
            hexTextSeparatorStyle:
            {
                backgroundColor: Color.magenta
            },

            textWordSeparator: "",
            textStyle:
            {
                backgroundColor: Color.blue,
                foregroundColor: Color.white
            },
            textUnrenderableCharacterStyle:
            {
                backgroundColor: Color.blue,
                dim: true
            },
            offsetStyle:
            {
                backgroundColor: Color.green,
                foregroundColor: Color.white,
                bold: true
            },
            hexStyle:
            {
                foregroundColor: Color.white,
                backgroundColor: Color.red
            }
        };

        return "Raw Data Received:\n" + hexDump(data, undefined, undefined, hexDumpOptions) + "\n";
    }
}
```

## Author

👤 **Y. Orçun GÖKBULUT**

* Github: [@orcun-gokbulut](https://github.com/orcun-gokbulut)
* E-mail: orcun.gokbulut@gmail.com

## 🤝 Contributing
Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/orcun-gokbulut/hex-dump/issues). You can also take a look at the [contributing guide](https://github.com/orcun-gokbulut/hex-dump/blob/master/CONTRIBUTING.md).

## 📝 License
Copyright © 2022 [Y. Orçun GÖKBULUT](https://github.com/orcun-gokbulut).<br />
This project is [GPL--3.0](https://github.com/orcun-gokbulut/hex-dump/blob/master/LICENSE) licensed.
<br>
<br>
