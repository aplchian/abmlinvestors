import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { w3cwebsocket as W3CWebSocket } from "websocket";

import React from 'react'
const client = new W3CWebSocket('wss://ws.finnhub.io?token=c24ospaad3ickpckcik0');

export default function Home() {
    const [price, setPrice] = React.useState({color: 'black', price: null})

    React.useEffect(() => {
        client.onopen = () => {
            console.log('WebSocket Client Connected');
            client.send(JSON.stringify({'type':'subscribe', 'symbol': 'TSLA'}))
        };
        client.onmessage = function(e) {
            try {
            const currentPrice = JSON.parse(e.data).data[0].p
            setPrice((current) => {
                return {
                    color: currentPrice > current.price ? 'green' : 'red',
                    price: currentPrice
                }
            })
            }catch(err) {
                console.log(err)
            }
        };

    },[])

  return (
    <div className={styles.container}>
      <Head>
        <title>ABML Investors</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
            {
                price.price != null && <a href="https://nextjs.org" style={{color: price.color}}>{price.price.toFixed(2)}</a>
            }

        </h1>


      </main>
    </div>
  )
}
