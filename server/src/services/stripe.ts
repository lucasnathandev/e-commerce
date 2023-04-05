import { CardSchema } from "src/models/_stripe";

async function debitCardPayment(value: number, cardInfo: typeof CardSchema) {}

async function creditCardPayment(value: number, cardInfo: typeof CardSchema) {}

async function slipPayment(value: number, customerInfo: {}) {}
