export interface IPropertyDecorator {
  defined?: boolean;
  stringType?:
    | 'generic'
    | 'email'
    | 'date'
    | 'url'
    | 'iban'
    | 'identity-card'
    | 'number';
  numberType?: 'generic' | 'int';
  each?: boolean;
  doc?: IDocDecorator;
  model?: IModelDecorator;
}

interface IDocDecorator {
  example?: unknown;
  description?: string;
}

interface IModelDecorator {
  required?: boolean;
  trim?: boolean;
  ref?: string;
  unique?: boolean;
  default?: unknown;
}

export const defaultConfig: IPropertyDecorator = {
  defined: false,
  stringType: 'generic',
  numberType: 'generic',
  each: false,
  model: {
    required: false,
    trim: true,
  },
};
