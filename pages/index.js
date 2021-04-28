import Head from 'next/head'
import styles from '../styles/Home.module.css'

import React from 'react'

export default function Home() {
    const [price, setPrice] = React.useState({color: 'black', price: null})

    React.useEffect(() => {

        const fn = async () => {
            const res = await fetch(`/api/hello/`)
            const {price: currentPrice} = await res.json()
            try {

                setPrice((current) => {
                    let color
                    if(currentPrice === current.price){
                        color = current.color
                    }else if(currentPrice > current.price){
                        color = 'green'
                    }else{
                        color = 'red'
                    }
                    return {
                        color,
                        price: currentPrice
                    }
                })
            }catch(err) {
                console.log(err)
            }
        }

        const int = setInterval(fn,1000)
        fn()

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
                price.price != null && <a href="https://nextjs.org" style={{color: price.color}}>${price.price.toFixed(2)}</a>
            }

        </h1>


      </main>
    </div>
  )
}
