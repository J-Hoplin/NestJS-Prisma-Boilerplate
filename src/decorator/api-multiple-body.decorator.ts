import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiBody, getSchemaPath } from '@nestjs/swagger';

/**
 * For swagger request body definition
 *
 * Define for multiple request body type
 */

interface ResponseReference {
  classRef: Type;
  example: any;
  isArray?: boolean;
  description?: string;
}

export type MultipleResponseOptions = Record<string, ResponseReference>;

// Use when Swagger requires to show multiple body
export const ApiMultipleBody = (options: MultipleResponseOptions) => {
  const models = Object.values(options).map((option) => {
    return option.classRef;
  });

  const responseExample = {};
  for (const [key, option] of Object.entries(options)) {
    responseExample[key] = {
      value: option.isArray ? [option.example] : option.example,
      description: option.description ?? '',
    };
  }

  return applyDecorators(
    ApiExtraModels(...models),
    ApiBody({
      schema: {
        oneOf: models.map((model) => {
          return {
            $ref: getSchemaPath(model),
          };
        }),
      },
      examples: responseExample,
    }),
  );
};
