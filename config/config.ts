'use strict';
import { EggAppConfig } from 'egg';
import 'source-map-support/register';
import defaultConfig from './DefaultConfig'

export default (appInfo: EggAppConfig) => {
    const config: any = {};
    config.keys = 'floveluyKey12356';
    config.middleware = ['wechat'];
    config.bodyParser = {
        extendTypes: {
            text: ['application/xml'],
        },
        enableTypes: ['text']
    };
    config.security = {
        csrf: {
            enable: false,
        }
    };
    return { ...config, ...defaultConfig };
};