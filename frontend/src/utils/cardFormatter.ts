export function formatCardNumber(cardNumber: string) {
    if (!cardNumber || cardNumber === undefined) {
        return ''
    }
   return String(cardNumber)
            .replace(/[^\d]/g, '')
            .replace(/(.{4})/g, '$1 ')
            .trim()
   
   
}