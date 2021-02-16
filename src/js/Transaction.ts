import {
    ITransaction,
    ITransactionData,
    ITransactionInputData,
    ITransactionInput,
    ITransactionOutput,
    ITransactionOutputData,
    IInputTotal,
    IOutputTotal,
} from '@/js/ITransaction'
import { CChainInfo, PChainInfo, XChainInfo, stringToBig } from '@/helper'

function getOutput(output: ITransactionOutputData): ITransactionOutput {
    return {
        id: output.id,
        transactionID: output.transactionID,
        outputIndex: output.outputIndex,
        assetID: output.assetID,

        stake: output.stake,
        frozen: output.frozen,
        stakeableout: output.stakeableout,
        genesisutxo: output.genesisutxo,

        outputType: output.outputType,
        amount: stringToBig(output.amount), // TODO: this Big conversion is not denominated bc of dependency on asset lookup
        locktime: output.locktime,
        stakeLocktime: output.stakeLocktime,
        threshold: output.threshold,

        addresses: output.addresses,
        caddresses: output.caddresses,

        timestamp: new Date(output.timestamp),
        redeemingTransactionID: output.redeemingTransactionID,

        chainID: output.chainID,
        groupID: output.groupID,
        payload: output.payload,

        block: output.block,
        nonce: output.nonce,
    }
}
/**
 * These types come from here @link https://github.com/ava-labs/ortelius/blob/ec567c97630383d1a4ef468cf1bcf35d5d1eb3d2/services/indexes/models/types.go#L56
 */
export const txTypeMap = new Map<string, string>([
    ['base', 'Base'],
    ['create_asset', 'Create Asset'], // X
    /**
     * @link https://docs.avax.network/build/references/avm-transaction-serialization#operations
     */
    ['operation', 'Operation'], // X
    ['import', 'Import'], // X
    ['export', 'Export'], // X
    ['atomic_import_tx', 'Atomic Import'], // C
    ['atomic_export_tx', 'Atomic Export'], // C
    ['add_validator', 'Add Validator'], // P
    ['add_subnet_validator', 'Add Subnet Validator'], // P
    ['add_delegator', 'Add Delegator'], // P
    ['create_subnet', 'Create Subnet'], // P
    ['create_chain', 'Create Chain'], // P
    ['pvm_export', 'PVM Export'], // P
    ['pvm_import', 'PVM Import'], // P
    ['advance_time', 'Advance Time'], // P
    ['reward_validator', 'Reward Validator'], // P
])

export const txChainTypeMap = new Map<string, typeof CChainInfo>([
    [CChainInfo.id, CChainInfo],
    [PChainInfo.id, PChainInfo],
    [XChainInfo.id, XChainInfo],
])

export function getMappingForType(type: string) {
    return txTypeMap.get(type) || 'Unknown'
}

export function getTransactionChainType(chainID: string) {
    return txChainTypeMap.get(chainID)
}

export function getTransactionOutputs(
    outputs: ITransactionOutput[],
    chainID: string,
    txType: string
) {
    return outputs.map((output) => {
        const chainType = getTransactionChainType(chainID)
        const addresses =
            output.addresses !== null ? output.addresses : output.caddresses
        let prefix = output.addresses !== null ? `${chainType?.code}-` : ``
        if (prefix === 'C-') {
            prefix = 'X-'
        }
        return {
            ...output,
            addresses: addresses.map(
                (address) =>
                    ({
                        address,
                        displayText: `${prefix}${address}`,
                    } as DisplayAddress)
            ),
        }
    })
}

export function getTransactionInputs(
    inputs: ITransactionInput[],
    chainId: string,
    txType: string
) {
    return getTransactionOutputs(
        inputs.map((input) => input.output),
        chainId,
        txType
    )
}

export interface DisplayAddress {
    address: string
    displayText: string
}
export class Transaction implements ITransaction {
    id: string
    chainID: string
    type: string
    inputs: ITransactionInput[]
    outputs: ITransactionOutput[]
    memo: string
    inputTotals: IInputTotal // TODO new stuff
    outputTotals: IOutputTotal // TODO new stuff
    reusedAddressTotals?: string | null // TODO new stuff
    timestamp: string
    txFee: number
    genesis: boolean
    rewarded: boolean
    rewardedTime: string | null
    epoch: number
    vertexId: string
    validatorNodeID: string
    validatorStart: number
    validatorEnd: number
    txBlockId: string

    constructor(data: ITransactionData) {
        this.id = data.id
        this.chainID = data.chainID
        this.type = data.type
        this.inputs =
            data.inputs === null || data.inputs.length === 0
                ? []
                : data.inputs.map((input: ITransactionInputData) => {
                      return {
                          credentials: input.credentials,
                          output: getOutput(input.output),
                      }
                  })
        this.outputs =
            data.outputs === null || data.outputs.length === 0
                ? []
                : data.outputs.map((output: ITransactionOutputData) =>
                      getOutput(output)
                  )
        this.memo = data.memo
        this.inputTotals = data.inputTotals
        this.outputTotals = data.outputTotals
        this.reusedAddressTotals = data.reusedAddressTotals
        this.timestamp = data.timestamp
        this.txFee = data.txFee
        this.genesis = data.genesis
        this.rewarded = data.rewarded
        this.rewardedTime = data.rewardedTime
        this.epoch = data.epoch
        this.vertexId = data.vertexId
        this.validatorNodeID = data.validatorNodeID
        this.validatorStart = data.validatorStart
        this.validatorEnd = data.validatorEnd
        this.txBlockId = data.txBlockId
    }

    getInputAddresses(): string[] {
        const res: string[] = []
        const inputs = this.inputs || []

        inputs.forEach((input) => {
            res.push(...input.output.addresses)
        })

        return res
    }
}
