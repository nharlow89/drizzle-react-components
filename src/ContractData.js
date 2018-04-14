import { drizzleConnect } from 'drizzle-react'
import React, { Component } from 'react'
import PropTypes from 'prop-types'


class ContractData extends Component {
    static contextTypes = {
        drizzle: PropTypes.object,
    };
    static propTypes = {
        children: PropTypes.func.isRequired,
        contract: PropTypes.string.isRequired,
        method: PropTypes.string.isRequired,
        methodArgs: PropTypes.array,
        // drizzleConnect bound props
        contracts: PropTypes.array.isRequired,
    };
    constructor(props, context) {
        super(props)
        this.contracts = context.drizzle.contracts
        // Get the contract ABI
        const abi = this.contracts[this.props.contract].abi;
        // Fetch initial value from chain and return cache key for reactive updates.
        var methodArgs = this.props.methodArgs ? this.props.methodArgs : []
        this.dataKey = this.contracts[this.props.contract].methods[this.props.method].cacheCall(...methodArgs)
        // Iterate over abi for correct function.
        for (var i = 0; i < abi.length; i++) {
            if (abi[i].name === this.props.method) {
                this.fnABI = abi[i]
                break
            }
        }
    }
    render() {
        const initialized = this.props.contracts[this.props.contract].initialized
        const loading = !(this.dataKey in this.props.contracts[this.props.contract][this.props.method])
        const synced = this.props.contracts[this.props.contract].synced
        return this.props.children({
            initialized,
            loading,
            synced,
            data: initialized & !loading ? this.props.contracts[this.props.contract][this.props.method][this.dataKey].value : null,
        })
    }
}

const mapStateToProps = state => {
    return {
        contracts: state.contracts
    }
}

export default drizzleConnect(ContractData, mapStateToProps)
