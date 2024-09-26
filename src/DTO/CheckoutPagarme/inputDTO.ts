export type OrdersInputDTO = {
     cart:string[]
     name:string;
     email:string;
     id:string;
   
}
export type WebHookInputDTO = {
    id: string;
    code: string;
    amount: number;
    currency: string;
    closed: boolean;
    items: {
      id: string;
      type: string;
      description: string;
      amount: number;
      quantity: number;
      status: string;
      created_at: string;
      updated_at: string;
      code: string;
    }[];
    customer: {
      id: string;
      name: string;
      email: string;
      delinquent: boolean;
      created_at: string;
      updated_at: string;
      phones: Record<string, any>;
    };
    status: string;
    created_at: string;
    updated_at: string;
    closed_at: string;
    charges: {
      id: string;
      code: string;
      gateway_id: string;
      amount: number;
      paid_amount: number;
      status: string;
      currency: string;
      payment_method: string;
      paid_at: string;
      created_at: string;
      updated_at: string;
      checkout_payment: {
        id: string;
        amount: number;
        status: string;
        payment_url: string;
        customer_editable: boolean;
        billing_address_editable: boolean;
        skip_checkout_success_page: boolean;
        shippable: boolean;
        created_at: string;
        updated_at: string;
      };
      customer: {
        id: string;
        name: string;
        email: string;
        document: string;
        document_type: string;
        type: string;
        delinquent: boolean;
        address: {
          id: string;
          street: string;
          number: string;
          complement: string;
          zip_code: string;
          neighborhood: string;
          city: string;
          state: string;
          country: string;
          status: string;
          created_at: string;
          updated_at: string;
        };
        created_at: string;
        updated_at: string;
        phones: {
          home_phone: {
            country_code: string;
            number: string;
            area_code: string;
          };
          mobile_phone: {
            country_code: string;
            number: string;
            area_code: string;
          };
        };
      };
      last_transaction: {
        id: string;
        transaction_type: string;
        gateway_id: string;
        amount: number;
        status: string;
        success: boolean;
        installments: number;
        statement_descriptor: string;
        acquirer_name: string;
        acquirer_tid: string;
        acquirer_nsu: string;
        acquirer_auth_code: string;
        acquirer_message: string;
        acquirer_return_code: string;
        operation_type: string;
        card: {
          id: string;
          first_six_digits: string;
          last_four_digits: string;
          brand: string;
          holder_name: string;
          holder_document: string;
          exp_month: number;
          exp_year: number;
          status: string;
          type: string;
          created_at: string;
          updated_at: string;
          billing_address: {
            street: string;
            number: string;
            complement: string;
            zip_code: string;
            neighborhood: string;
            city: string;
            state: string;
            country: string;
          };
        };
        funding_source: string;
        created_at: string;
        updated_at: string;
        gateway_response: {
          code: string;
          errors: any[];
        };
        antifraud_response: {
          status: string;
          score: string;
          provider_name: string;
        };
        metadata: {
          id: string;
        };
      };
    }[];
    checkouts: {
      id: string;
      currency: string;
      amount: number;
      status: string;
      default_payment_method: string;
      success_url: string;
      payment_url: string;
      customer_editable: boolean;
      required_fields: string[];
      billing_address_editable: boolean;
      skip_checkout_success_page: boolean;
      shippable: boolean;
      created_at: string;
      updated_at: string;
      closed_at: string;
      expires_at: string;
      accepted_payment_methods: string[];
      accepted_brands: string[];
      accepted_multi_payment_methods: string[];
      customer: {
        id: string;
        name: string;
        email: string;
        delinquent: boolean;
        created_at: string;
        updated_at: string;
        phones: Record<string, any>;
      };
      credit_card: {
        capture: boolean;
        statementDescriptor: string;
        statement_descriptor: string;
        authentication: {
          type: string;
          threed_secure: Record<string, any>;
        };
        installments: {
          number: number;
          total: number;
        }[];
      };
      pix: {
        expires_at: string;
        additional_information: any[];
      };
      billing_address: Record<string, any>;
      metadata: {
        id: string;
      };
    }[];
    metadata: {
      id: string;
    };
  };
  