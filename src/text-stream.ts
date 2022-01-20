import colors from 'colors/safe';
import { Color, Style } from './buffer-hex-dump';

export class TextStream
{
    private output : string = "";
    private buffer : string = "";
    private currentStyle : Style | null = null;

    private applyStyle(text : string, style : Style) : string
    {
        let output = "";
        switch (style.foregroundColor!)
        {
            default:
            case Color.default:
                output = text;
                break;

            case Color.black:
                output = colors.black(text);
                break;

            case Color.red:
                output = colors.red(text);
                break;

            case Color.green:
                output = colors.green(text);
                break;

            case Color.yellow:
                output = colors.yellow(text);
                break;

            case Color.blue:
                output = colors.blue(text);
                break;

            case Color.magenta:
                output = colors.magenta(text);
                break;

            case Color.cyan:
                output = colors.cyan(text);
                break;

            case Color.white:
                output = colors.white(text);
                break;

            case Color.gray:
                output = colors.gray(text);
                break;
        }

        switch (style.backgroundColor!)
        {
            default:
            case Color.default:
                break;

            case Color.black:
                output = colors.bgBlack(output);
                break;

            case Color.red:
                output = colors.bgRed(output);
                break;

            case Color.green:
                output = colors.bgGreen(output);
                break;

            case Color.yellow:
                output = colors.bgYellow(output);
                break;

            case Color.blue:
                output = colors.bgBlue(output);
                break;

            case Color.magenta:
                output = colors.bgMagenta(output);
                break;

            case Color.cyan:
                output = colors.bgCyan(output);
                break;

            case Color.white:
                output = colors.bgWhite(output);
                break;

            case Color.gray:
                output = colors.bgWhite(output);
                break;
        }

        if (style.dim)
            output = colors.dim(output);

        if (style.bold)
            output = colors.bold(output);

        if (style.italic)
            output = colors.italic(output);

        if (style.underline)
            output = colors.underline(output);

        if (style.strike)
            output = colors.strikethrough(output);

        if (style.inverse)
            output = colors.inverse(output);

        return output;
    }

    private render()
    {
        if (this.buffer === "")
            return;

        if (this.currentStyle === null)
            this.output += this.buffer;
        else
            this.output += this.applyStyle(this.buffer, this.currentStyle);

        this.buffer = "";
    }

    public write(text : string, style : Style | null)
    {
        if (text === "")
            return;

        if (this.currentStyle !== style)
        {
            this.render();
            this.currentStyle = style;
        }

        this.buffer += text;
    }

    public end() : string
    {
        this.render();
        this.currentStyle = null;
        const temp = this.output;
        this.output = "";
        return temp;
    }
};
