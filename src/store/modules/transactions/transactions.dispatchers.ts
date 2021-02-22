import store from '@/store'
import { TX_NAMESPACE } from './transactions.constants'

export enum TXACTION {
    GET_TXS = 'getTxs',
    GET_TX_RECENT = 'getRecentTxs',
    GET_TXS_BY_ASSET = 'getTxsByAsset',
    GET_TXS_BY_ADDRESS = 'getTxsByAddress',
}

export function dispatchGetTxs() {
    return store.dispatch(`${TX_NAMESPACE}/${TXACTION.GET_TXS}`)
}

export function dispatchGetRecentTxs() {
    return store.dispatch(`${TX_NAMESPACE}/${TXACTION.GET_TX_RECENT}`)
}

export function dispatchGetTxsByAsset() {
    return store.dispatch(`${TX_NAMESPACE}/${TXACTION.GET_TXS_BY_ASSET}`)
}

export function dispatchGetTxsByAddress() {
    return store.dispatch(`${TX_NAMESPACE}/${TXACTION.GET_TXS_BY_ADDRESS}`)
}
