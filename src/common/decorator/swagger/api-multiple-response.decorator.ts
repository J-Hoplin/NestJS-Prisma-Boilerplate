// Nest Packages
import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

// Custom Packages
import { MultipleResponseOptions } from './type';

/**
 * For swagger response definition
 *
 * Define for multiple response
 */

// Use when Swagger requires to show multiple response
export const ApiMultipleResponse = (
  statusCode: HttpStatus | number,
  options: MultipleResponseOptions,
) => {
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
    ApiResponse({
      status: statusCode,
      content: {
        'application/json': {
          schema: {
            oneOf: models.map((model) => {
              return {
                $ref: getSchemaPath(model),
              };
            }),
          },
          examples: responseExample,
        },
      },
    }),
  );
};
