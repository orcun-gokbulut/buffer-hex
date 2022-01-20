import { TextStream } from './text-stream';

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

export interface Style
{
    foregroundColor? : Color;
    backgroundColor? : Color;

    dim? : boolean;
    bold? : boolean;
    italic? : boolean;
    underline? : boolean;
    strike? : boolean;
    inverse? : boolean;
}

export interface Options
{
    // GLOBAL
    rowSize? : number;
    groupSize? : number;
    wordSize? : number;
    styleEnabled? : boolean;
    uppercase?: boolean;
    newLineCharacter? : string;


    // OFFSET COLUMN
    offsetEnabled? : boolean;
    offsetStyle? : Style;
    offsetSeparator? : string;


    // OFFSET <-> HEX SEPERATOR
    offsetHexSeparator? : string;
    offsetHexSeperatorStyle? : Style;


    // HEX COLUMNS
    hexEnabled? : boolean;
    hexWordSeparator? : string;
    hexGroupSeparator? : string;
    hexStyle? : Style;


    // HEX <-> TEXT SEPARATOR
    hexTextSeparator? : string;
    hexTextSeparatorStyle? : Style;


    // TEXT COLUMNS
    textEnabled? : boolean;
    textStyle? : Style;
    textWordSeparator? : string;
    textGroupSeparator? : string;
    textUnrenderableCharacter? : string;
    textUnrenderableCharacterStyle? : Style;
};

function normalizeStyle(style? : Style) : Style
{
    let normStyle : Style;
    if (style === undefined)
        normStyle = {};
    else
        normStyle = Object.create(style) as Style;

    if (normStyle.foregroundColor === undefined)
        normStyle.foregroundColor = Color.default;

    if (normStyle.backgroundColor === undefined)
        normStyle.backgroundColor = Color.default;

    if (normStyle.dim === undefined)
        normStyle.dim = false;

    if (normStyle.bold === undefined)
        normStyle.bold = false;

    if (normStyle.italic === undefined)
        normStyle.italic = false;

    if (normStyle.underline === undefined)
        normStyle.underline = false;

    if (normStyle.strike === undefined)
        normStyle.strike = false;

    if (normStyle.inverse === undefined)
        normStyle.inverse = false;

    return normStyle;
}

function normalizeOptions(options? : Options) : Options
{
    let normOptions : Options;
    if (options === undefined)
        normOptions = {};
    else
        normOptions = Object.create(options) as Options;


    // GENERAL
    if (normOptions.rowSize === undefined)
        normOptions.rowSize = 20;

    if (normOptions.wordSize === undefined)
        normOptions.wordSize = 1;

    if (normOptions.groupSize === undefined)
        normOptions.groupSize = 4;

    if (normOptions.uppercase === undefined)
        normOptions.uppercase = true;

    if (normOptions.styleEnabled === undefined)
        normOptions.styleEnabled = true;

    if (normOptions.newLineCharacter === undefined)
        normOptions.newLineCharacter = "\n";


    // OFFSET COLUMN
    if (normOptions.offsetEnabled === undefined)
        normOptions.offsetEnabled = true;

    normOptions.offsetStyle = normalizeStyle(normOptions.offsetStyle);

    if (normOptions.offsetSeparator === undefined)
        normOptions.offsetSeparator = ":";


    // OFFSET <-> HEX SEPARATOR
    if (normOptions.offsetHexSeparator === undefined)
        normOptions.offsetHexSeparator = " | ";

    normOptions.offsetHexSeperatorStyle = normalizeStyle(normOptions.offsetHexSeperatorStyle);


    // HEX COLUMNS
    if (normOptions.hexEnabled === undefined)
        normOptions.hexEnabled = true;

    if (normOptions.hexWordSeparator === undefined)
        normOptions.hexWordSeparator = " ";

    if (normOptions.hexGroupSeparator === undefined)
        normOptions.hexGroupSeparator = " ";

    normOptions.hexStyle = normalizeStyle(normOptions.hexStyle);


    // HEX <-> TEXT SEPARATOR
    if (normOptions.hexTextSeparator === undefined)
        normOptions.hexTextSeparator = " | ";

    normOptions.hexTextSeparatorStyle = normalizeStyle(normOptions.hexTextSeparatorStyle);


    // TEXT COLUMNS
    if (normOptions.textEnabled === undefined)
        normOptions.textEnabled = true;

    normOptions.textStyle = normalizeStyle(normOptions.textStyle);

    if (normOptions.textWordSeparator === undefined)
        normOptions.textWordSeparator = "";

    if (normOptions.textGroupSeparator === undefined)
        normOptions.textGroupSeparator = " ";

    if (normOptions.textUnrenderableCharacter === undefined)
        normOptions.textUnrenderableCharacter = '·';

    normOptions.textUnrenderableCharacterStyle = normalizeStyle(
        normOptions.textUnrenderableCharacterStyle !== undefined ?
            normOptions.textUnrenderableCharacterStyle :
            { dim: true }
    );

    return normOptions;
}

export function dump(buffer : Buffer, offset? : number, count? : number, options? : Options) : string
{
    const normOptions = normalizeOptions(options);

    let output = new TextStream();

    for (let y = 0; y < buffer.length / normOptions.rowSize!; y++)
    {
        // OFFSET
        if (normOptions.offsetEnabled!)
        {
            const offset = y * normOptions.rowSize!;
            const offsetUpper = Math.floor(offset / 256)
            const offsetLower = offset - offsetUpper

            let offsetOutput = "";

            let offsetText = offsetUpper.toString(8).padStart(4, '0');
            if (normOptions.uppercase!)
                offsetText = offsetText.toUpperCase();
            offsetOutput += offsetText;

            offsetOutput += normOptions.offsetSeparator!;

            offsetText = offsetLower.toString(16).padStart(4, '0')
            if (normOptions.uppercase)
                offsetText = offsetText.toUpperCase();
            offsetOutput += offsetText;

            output.write(offsetOutput, normOptions.offsetStyle!);
        }

        // OFFSET HEX SEPARATOR
        if (normOptions.offsetEnabled! && (normOptions.hexEnabled! || normOptions.textEnabled!))
            output.write(normOptions.offsetHexSeparator!, normOptions.offsetHexSeperatorStyle!);


        // HEX
        if (normOptions.hexEnabled!)
        {
            let hexOutput = "";
            for (let x = 0; x < normOptions.rowSize!; x++)
            {
                if (x != 0)
                {
                    if (normOptions.wordSize! != 0 && (x % normOptions.wordSize!) == 0)
                        hexOutput += normOptions.hexWordSeparator!;

                    if (normOptions.groupSize != 0 && ((x / (normOptions.wordSize!)) % normOptions.groupSize!) == 0)
                        hexOutput += normOptions.hexGroupSeparator!;
                }

                const index = y * normOptions.rowSize! + x;
                let value = buffer.at(index) as number;
                if (index < buffer.length)
                {
                    if (normOptions.uppercase!)
                        hexOutput += value.toString(16).toUpperCase().padStart(2, '0');
                    else
                        hexOutput += value.toString(16).padStart(2, '0');
                }
                else
                {
                    if (normOptions.textEnabled!)
                        hexOutput += "  ";
                    else
                        break;
                }
            }
            output.write(hexOutput, normOptions.hexStyle!);
        }


        // HEX TEXT SEPARATOR
        if (normOptions.hexEnabled! && normOptions.textEnabled!)
            output.write(normOptions.hexTextSeparator!, normOptions.hexTextSeparatorStyle!);


        // TEXT
        if (normOptions.textEnabled!)
        {
            for (let x = 0; x < normOptions.rowSize!; x++)
            {
                if (x != 0)
                {
                    if (normOptions.wordSize! != 0 && (x % normOptions.wordSize!) == 0)
                        output.write(normOptions.textWordSeparator!, normOptions.textStyle!);

                    if (normOptions.groupSize != 0 && ((x / (normOptions.wordSize!)) % normOptions.groupSize!) == 0)
                        output.write(normOptions.textGroupSeparator!, normOptions.textStyle!);
                }

                const index = y * normOptions.rowSize! + x;

                let value : number;
                if (index < buffer.length)
                    value = buffer.at(index) as number;
                else
                    value = 32; // Space

                if (value < 32 || value >= 127)
                    output.write(normOptions.textUnrenderableCharacter!, normOptions.textUnrenderableCharacterStyle!);
                else
                    output.write(String.fromCharCode(value), normOptions.textStyle!)
            }
        }

        output.write(normOptions.newLineCharacter!, null);
    }

    return output.end();
}
