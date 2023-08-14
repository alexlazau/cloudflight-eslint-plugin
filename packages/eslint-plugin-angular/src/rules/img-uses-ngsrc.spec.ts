import {ESLintUtils} from '@typescript-eslint/utils';

import {imgUsesNgsrcRule, imgUsesNgsrcRuleName} from './img-uses-ngsrc';

const ruleTester = new ESLintUtils.RuleTester({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    parser: require.resolve('@angular-eslint/template-parser'),
});

ruleTester.run(imgUsesNgsrcRuleName, imgUsesNgsrcRule, {
    valid: ['<img ngSrc="http://localhost">', "<img [ngSrc]=\"'http://localhost'>", '<img [ngSrc]="value">'],
    invalid: [
        {
            code: '<img src="http://localhost">',
            errors: [
                {
                    messageId: 'missingAttribute',
                },
            ],
        },
        {
            code: '<img [src]="\'http://localhost\'">',
            errors: [
                {
                    messageId: 'missingAttribute',
                },
            ],
        },
        {
            code: '<img [src]="value">',
            errors: [
                {
                    messageId: 'missingAttribute',
                },
            ],
        },
        {
            code: '<img ngSrc="http://localhost" src="http://localhost">',
            errors: [
                {
                    messageId: 'invalidDoubleSource',
                },
            ],
        },
        {
            code: '<img ngSrc="http://localhost" [src]="\'http://localhost\'">',
            errors: [
                {
                    messageId: 'invalidDoubleSource',
                },
            ],
        },
        {
            code: '<img ngSrc="http://localhost" [src]="value">',
            errors: [
                {
                    messageId: 'invalidDoubleSource',
                },
            ],
        },
        {
            code: '<img [ngSrc]="otherValue" src="http://localhost">',
            errors: [
                {
                    messageId: 'invalidDoubleSource',
                },
            ],
        },
        {
            code: '<img [ngSrc]="otherValue" [src]="\'http://localhost\'">',
            errors: [
                {
                    messageId: 'invalidDoubleSource',
                },
            ],
        },
        {
            code: '<img [ngSrc]="otherValue" [src]="value">',
            errors: [
                {
                    messageId: 'invalidDoubleSource',
                },
            ],
        },
    ],
});
