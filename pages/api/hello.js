// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req, res) => {
    const OPTIONS = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    const response = await fetch(`https://quote.cnbc.com/quote-html-webservice/restQuote/symbolType/symbol?symbols=ABML&requestMethod=itv&noform=1&partnerId=2&fund=1&exthrs=1&output=json&events=1`, OPTIONS)
    res.setHeader('Cache-Control', 'no-cache')
    if (response.ok) {
        const data = await response.json()
        return res.status(200).send(JSON.stringify({price: Number(data.FormattedQuoteResult.FormattedQuote[0].last)}))
    } else {
        throw new Error(response.statusText)
    }


  //   console.log('HI!!')
  //   const xx = await fetch(`https://api.nasdaq.com/api/quote/ABML/info?assetclass=stocks`)
  //
  //   console.log('xx', xx)
  //   const data = await xx.json()
  //
  //   console.lg('data', data)
  //
  //
  //
  // res.statusCode = 200
  // res.json(data)
}
