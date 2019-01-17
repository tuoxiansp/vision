import { css } from 'docz-plugin-css'

export default {
    typescript: true,
    title: 'Vision',
    description: 'Vision is a completely customizable framework for building WYSIWYG HTML editors',
    themeConfig: {
        colors: {
            primary: '#223f5a',
            link: '#1c25cc',
        },
        // logo: {
        //     src: 'https://raw.githubusercontent.com/Raathigesh/storyhooks/master/docs/Logo.png',
        //     width: 200,
        // },
        styles: {
            h1: {
                fontSize: 50,
            },
            link: {
                color: 'blue',
            },
        },
    },
    menu: [ 'Home', 'Get Started', 'Advanced', 'API References' ],
    plugins: [ css() ],
    codeSandbox: false,
    hashRouter: true,
    typescript: true,
}
