import { Vue, Component } from 'vue-property-decorator'
import {
    getTxs,
    getRecentTxs,
    getTxsByAsset,
    getTxsByAddress,
} from './transactions.getters'

@Component
export class TransactionsGettersMixin extends Vue {
    getTxs() {
        return getTxs()
    }

    getRecentTxs() {
        return getRecentTxs()
    }

    getTxsByAsset() {
        return getTxsByAsset()
    }

    getTxsByAddress() {
        return getTxsByAddress()
    }
}
