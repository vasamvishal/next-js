import React from 'react';
import App from 'next/app';
import {wrapper} from '../redux/stores';

class MyApp extends App {
    static async getInitialProps({Component, ctx}) {
        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
        
        //Anything returned here can be access by the client
        return {pageProps: pageProps};
    }

    render() {
        //Information that was returned  from 'getInitialProps' are stored in the props i.e. pageProps
        const {Component, pageProps} = this.props;
        return (
                <Component {...pageProps}/>
        );
    }

}

export default wrapper.withRedux(MyApp);