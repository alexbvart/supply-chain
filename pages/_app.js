import KeywordState from '../context/Keyword/KeywordState'
import Layout from '../src/container/Layout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <KeywordState>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </KeywordState>
  )

}

export default MyApp
