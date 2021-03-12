const DEFAULT_NETWORK_ID = parseInt(
    process.env.VUE_APP_DEFAULT_NETWORKID || '4'
)

const AVAX_ID =
    DEFAULT_NETWORK_ID === 115110116
        ? (process.env.VUE_APP_AVAXID as string)
        : (process.env.VUE_APP_TEST_AVAXID as string)

interface AssetDict {
    [key: string]: string
}

const dict: AssetDict = {
    AVAX: AVAX_ID,
}

export default dict
