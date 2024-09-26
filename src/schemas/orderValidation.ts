import { z } from 'zod';

// Esquema para 'item'
const ItemSchema = z.object({
  id: z.string(),
  type: z.string(),
  description: z.string(),
  amount: z.number(),
  quantity: z.number(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  code: z.string(),
});

// Esquema para 'address'
const AddressSchema = z.object({
  id: z.string().optional(),
  street: z.string(),
  number: z.string(),
  complement: z.string(),
  zip_code: z.string(),
  neighborhood: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
}).partial(); // Para permitir campos opcionais no endereço

// Esquema para 'phone'
const PhoneSchema = z.object({
  country_code: z.string(),
  number: z.string(),
  area_code: z.string(),
});

// Esquema para 'customer'
const CustomerSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  delinquent: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
  phones: z.object({
    home_phone: PhoneSchema.optional(),
    mobile_phone: PhoneSchema.optional(),
  }).optional(),
  address: AddressSchema.optional(),
  document: z.string().optional(),
  document_type: z.string().optional(),
  type: z.string().optional(),
});

// Esquema para 'card'
const CardSchema = z.object({
  id: z.string(),
  first_six_digits: z.string(),
  last_four_digits: z.string(),
  brand: z.string(),
  holder_name: z.string(),
  holder_document: z.string(),
  exp_month: z.number(),
  exp_year: z.number(),
  status: z.string(),
  type: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  billing_address: AddressSchema,
});

// Esquema para 'transaction'
const TransactionSchema = z.object({
  id: z.string(),
  transaction_type: z.string(),
  gateway_id: z.string(),
  amount: z.number(),
  status: z.string(),
  success: z.boolean(),
  installments: z.number(),
  statement_descriptor: z.string(),
  acquirer_name: z.string(),
  acquirer_tid: z.string(),
  acquirer_nsu: z.string(),
  acquirer_auth_code: z.string(),
  acquirer_message: z.string(),
  acquirer_return_code: z.string(),
  operation_type: z.string(),
  card: CardSchema,
  funding_source: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  gateway_response: z.object({
    code: z.string(),
    errors: z.array(z.string()).optional(),
  }),
  antifraud_response: z.object({
    status: z.string(),
    score: z.string(),
    provider_name: z.string(),
  }),
  metadata: z.object({
    id: z.string(),
  }),
});

// Esquema para 'charge'
const ChargeSchema = z.object({
  id: z.string(),
  code: z.string(),
  gateway_id: z.string(),
  amount: z.number(),
  paid_amount: z.number(),
  status: z.string(),
  currency: z.string(),
  payment_method: z.string(),
  paid_at: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  checkout_payment: z.object({
    id: z.string(),
    amount: z.number(),
    status: z.string(),
    payment_url: z.string(),
    customer_editable: z.boolean(),
    billing_address_editable: z.boolean(),
    skip_checkout_success_page: z.boolean(),
    shippable: z.boolean(),
    created_at: z.string(),
    updated_at: z.string(),
  }),
  customer: CustomerSchema,
  last_transaction: TransactionSchema,
});

// Esquema para 'checkout'
const CheckoutSchema = z.object({
  id: z.string(),
  currency: z.string(),
  amount: z.number(),
  status: z.string(),
  default_payment_method: z.string(),
  success_url: z.string(),
  payment_url: z.string(),
  customer_editable: z.boolean(),
  required_fields: z.array(z.string()),
  billing_address_editable: z.boolean(),
  skip_checkout_success_page: z.boolean(),
  shippable: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
  closed_at: z.string(),
  expires_at: z.string(),
  accepted_payment_methods: z.array(z.string()),
  accepted_brands: z.array(z.string()),
  accepted_multi_payment_methods: z.array(z.string()),
  customer: CustomerSchema,
  credit_card: z.object({
    capture: z.boolean(),
    statementDescriptor: z.string(),
    authentication: z.object({
      type: z.string(),
      threed_secure: z.object({}).optional(),
    }),
    installments: z.array(
      z.object({
        number: z.number(),
        total: z.number(),
      })
    ),
  }),
  pix: z.object({
    expires_at: z.string(),
    additional_information: z.array(z.string()).optional(),
  }),
  metadata: z.object({
    id: z.string(),
  }),
});

// Esquema completo para o pedido
export const OrderSchema = z.object({
  id: z.string(),
  code: z.string(),
  amount: z.number(),
  currency: z.string(),
  closed: z.boolean(),
  items: z.array(ItemSchema),
  customer: CustomerSchema,
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  closed_at: z.string(),
  charges: z.array(ChargeSchema),
  checkouts: z.array(CheckoutSchema),
  metadata: z.object({
    id: z.string(),
  }),
});
 export const orderStatusSchema = z.object({
   codeEnv:z.string().min(1,{message:"O codigo de envio e obrigatorio"}),
   status: z.enum(['andamento','enviado','entregue'])
})
// Validando um objeto JSON

export type OrderZodValidation = z.infer<typeof OrderSchema>;
