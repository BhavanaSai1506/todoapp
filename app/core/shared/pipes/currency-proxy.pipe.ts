import {CurrencyPipe} from '@angular/common';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'currency'})
export class CurrencyProxyPipe extends CurrencyPipe implements PipeTransform {
    transform(value: any, currencyCode: string = `EUR`, symbolDisplay: 'symbol', digits: string): string {
        let currencyFormat = super.transform(value, currencyCode, symbolDisplay, digits);

        if (!currencyFormat) {
            return value;
        }

        // If is a negative number
        if (currencyFormat[0] === '-') {
            currencyFormat = currencyFormat.slice(1);
            const firstDigit = currencyFormat.search(/\d/);
            return `-${currencyFormat.substr(firstDigit)} ${currencyFormat.substring(0, firstDigit)}`;
        }

        const firstDigit = currencyFormat.search(/\d/);
        return `${currencyFormat.substr(firstDigit)} ${currencyFormat.substring(0, firstDigit)}`;

    }
}