import { ITransactionOutputData } from '@/services/transactions/models.ts'
import { OutputType, BlockType } from './models'

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

/**
 * Info can be found here @link https://docs.avax.network/build/references/avm-transaction-serialization
 */
const outputTypes = new Map([
    [7, OutputType.TRANSFERABLE],
    [6, OutputType.MINT],
    [10, OutputType.NFT_MINT],
    [11, OutputType.NFT_TRANSFERABLE],
    [4294967281, OutputType.ATOMIC_EXPORT_TX],
    [4294967282, OutputType.ATOMIC_EXPORT_TX],
])

export function getOutputType(type: ITransactionOutputData['outputType']) {
    return outputTypes.get(type)
}

const blockTypes = new Map([
    [0, BlockType.PROPOSAL],
    [1, BlockType.ABORT],
    [2, BlockType.COMMIT],
    [3, BlockType.STANDARD],
    [4, BlockType.ATOMIC],
])

export function getBlockType(type: number) {
    return blockTypes.get(type)
}
