const ROUND_MINIMUM_VALUE = 0.000001;
const SIGNIFICANT_DIGITS = 3;

export class NumberUtils {
    static roundBySignificantDigits(value: string | number, significantDigits = SIGNIFICANT_DIGITS): string | number {
        const number = Number(value);

        if (isNaN(number) || value == null || value === '') {
            return value;
        }

        if (Math.abs(number) < ROUND_MINIMUM_VALUE) {
            return 0;
        }

        const length = Math.ceil(Math.log10(Math.abs(number)));
        const power = length - significantDigits;

        let magnitude;
        let shifted;

        // Inverse algorithm to avoid wrong precision
        // If value less than 1 or length less than significant digits we specified
        if (power < 0) {
            magnitude = Math.pow(10, Math.abs(power));
            shifted = Math.round(number * magnitude);
            return shifted / magnitude;
        }

        magnitude = Math.pow(10, power);
        shifted = Math.round(number / magnitude);
        return shifted * magnitude;
    }

    static round(value: number, precision = 2): number {
        return Number(value.toFixed(precision));
    }
}