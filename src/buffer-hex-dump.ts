import { TerminalStylerStream, TerminalStyle, TerminalColor } from "terminal-styler";

export interface BufferHexDumpOptions
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
    offsetStyle? : TerminalStyle;
    offsetSeparator? : string;


    // OFFSET <-> HEX SEPERATOR
    offsetHexSeparator? : string;
    offsetHexSeperatorStyle? : TerminalStyle;


    // HEX COLUMNS
    hexEnabled? : boolean;
    hexWordSeparator? : string;
    hexGroupSeparator? : string;
    hexStyle? : TerminalStyle;


    // HEX <-> TEXT SEPARATOR
    hexTextSeparator? : string;
    hexTextSeparatorStyle? : TerminalStyle;


    // TEXT COLUMNS
    textEnabled? : boolean;
    textStyle? : TerminalStyle;
    textWordSeparator? : string;
    textGroupSeparator? : string;
    textUnrenderableCharacter? : string;
    textUnrenderableCharacterStyle? : TerminalStyle;
};

function normalizeStyle(style? : TerminalStyle) : TerminalStyle
{
    let normStyle : TerminalStyle;
    if (style === undefined)
        normStyle = {};
    else
        normStyle = Object.create(style) as TerminalStyle;

    if (normStyle.foregroundColor === undefined)
        normStyle.foregroundColor = TerminalColor.default;

    if (normStyle.backgroundColor === undefined)
        normStyle.backgroundColor = TerminalColor.default;

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

function normalizeOptions(options? : BufferHexDumpOptions) : BufferHexDumpOptions
{
    let normOptions : BufferHexDumpOptions;
    if (options === undefined)
        normOptions = {};
    else
        normOptions = Object.create(options) as BufferHexDumpOptions;


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

export class BufferHexDump
{

    public static dump(buffer : Buffer, offset? : number, count? : number, options? : BufferHexDumpOptions) : string
    {
        const normOptions = normalizeOptions(options);

        const output = new TerminalStylerStream();

        const rowCount = buffer.length / normOptions.rowSize!;
        for (let y = 0; y < rowCount; y++)
        {
            // OFFSET
            if (normOptions.offsetEnabled!)
            {
                const offset = y * normOptions.rowSize!;
                const offsetUpper = Math.floor(offset / 256);
                const offsetLower = offset - offsetUpper;

                let offsetOutput = "";

                let offsetText = offsetUpper.toString(8).padStart(4, '0');
                if (normOptions.uppercase!)
                    offsetText = offsetText.toUpperCase();
                offsetOutput += offsetText;

                offsetOutput += normOptions.offsetSeparator!;

                offsetText = offsetLower.toString(16).padStart(4, '0');
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
                    if (x !== 0)
                    {
                        if (normOptions.wordSize! !== 0 && (x % normOptions.wordSize!) === 0)
                            hexOutput += normOptions.hexWordSeparator!;

                        if (normOptions.groupSize !== 0 && ((x / (normOptions.wordSize!)) % normOptions.groupSize!) === 0)
                            hexOutput += normOptions.hexGroupSeparator!;
                    }

                    const index = y * normOptions.rowSize! + x;
                    const value = buffer[index] as number;
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
                    if (x !== 0)
                    {
                        if (normOptions.wordSize! !== 0 && (x % normOptions.wordSize!) === 0)
                            output.write(normOptions.textWordSeparator!, normOptions.textStyle!);

                        if (normOptions.groupSize !== 0 && ((x / (normOptions.wordSize!)) % normOptions.groupSize!) === 0)
                            output.write(normOptions.textGroupSeparator!, normOptions.textStyle!);
                    }

                    const index = y * normOptions.rowSize! + x;

                    let value : number;
                    if (index < buffer.length)
                        value = buffer[index] as number;
                    else
                        value = 32; // Space

                    if (value < 32 || value >= 127)
                        output.write(normOptions.textUnrenderableCharacter!, normOptions.textUnrenderableCharacterStyle!);
                    else
                        output.write(String.fromCharCode(value), normOptions.textStyle!);
                }
            }

            if (y + 1 !== rowCount)
                output.write(normOptions.newLineCharacter!, null);
        }

        return output.end();
    }
}
