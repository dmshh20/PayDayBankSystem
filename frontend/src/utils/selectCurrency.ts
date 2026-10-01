export const selectCurrency = (newCurrency: string) => {
        localStorage.setItem('currencyParam', newCurrency)        
}