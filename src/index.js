import React from 'react';
import ReactDOM from 'react-dom';

import i18n from 'i18next';
import {initReactI18next, useTranslation} from 'react-i18next';
import XHR from 'i18next-xhr-backend';

import moment from 'moment';
import 'moment/min/locales.min';

i18n.on('languageChanged', l => moment.locale(l));
i18n.use(initReactI18next)
    .use(XHR)
    .init({
        ns: ['translation'],
        lng: 'en',
        fallbackLng: 'en',
        whitelist: ['en'],
        initImmediate: false,
        cleanCode: true,
        react: {wait: true, useSuspense: false},
        backend: {loadPath: '/locales/{{lng}}/{{ns}}.json'},
        interpolation: {
            escapeValue: false,
            format(value, fmt) {
                if (value instanceof Date) return moment(value).format(format);
                if (format === 'zero_as_no') return value == 0 ? 'No' : value;

                return value;
            }
        },
    });

function SomeComponent() {
    const {t} = useTranslation();

    return (
        <>
            <span>{t('forms.filesChosen', {count: 2})}</span>
            <span>{t('forms.filesChosen', {count: 1})}</span>
        </>
    );
}

ReactDOM.render(<SomeComponent />, document.getElementById('root'));
