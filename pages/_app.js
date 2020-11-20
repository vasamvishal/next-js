import React from 'react';
import App from 'next/app';
import {wrapper} from '../redux/stores';

class MyApp extends App {
    static async getInitialProps({Component, ctx}) {
        console.log(Component,"Compddd");
        console.log(ctx,"ctx");
        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

        //Anything returned here can be access by the client
        return {pageProps: pageProps};
    }

    render() {
        //Information that was returned  from 'getInitialProps' are stored in the props i.e. pageProps
        const {Component, pageProps} = this.props;
        console.log(Component,"Comp");
        console.log(pageProps,"propsMyAPP");
        return (
                <Component {...pageProps}/>
        );
    }

}

export default wrapper.withRedux(MyApp);