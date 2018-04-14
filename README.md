# drizzle-react-components
A set of useful components built on `drizzle-react`

## Components

### LoadingContainer

This components wraps your entire app (but within the DrizzleProvider) and will show a loading screen until Drizzle, and therefore web3 and your contracts, are initialized.

`loadingComp` (component) The component displayed while Drizzle intializes.

`errorComp` (component) The component displayed if Drizzle initialization fails.

### ContractData

`contract` (string, required) Name of the contract to call.

`method` (string, required) Method of the contract to call.

`methodArgs` (array) Arguments for the contract method call. EX: The address for an ERC20 balanceOf() function. The last argument can optionally be an options object with the typical from, gas and gasPrice keys.

```js
<ContractData contract="Escrow" method="getBalance">
    {({initialized, loading, synced, data}) => {
        if ( !initialized || loading )
            return <div>Loading...</div>
        // Format data as you wish
        const formattedData = JSON.stringify(data, null, 4);
        return (
            <pre>{formattedData}</pre>
        )
    }}
</ContractData>
```

### ContractForm

`contract` (string, required) Name of the contract whose method will be the basis the form.

`method` (string, required) Method whose inputs will be used to create corresponding form fields.

`labels` (array) Custom labels; will follow ABI input ordering. Useful for friendlier names. For example "_to" becoming "Recipient Address".
