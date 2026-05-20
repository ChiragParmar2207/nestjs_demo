type ApiResponseExample = {
  success: boolean;
  message: string;
  data: unknown;
  errors: string[];
};

const apiResponseSchema = (example: ApiResponseExample) => ({
  schema: {
    type: 'object',
    properties: {
      success: { type: 'boolean', example: example.success },
      message: { type: 'string', example: example.message },
      data: { type: 'object', example: example.data },
      errors: {
        type: 'array',
        items: { type: 'string' },
        example: example.errors,
      },
    },
  },
});

export const apiSuccessResponseSchema = (message: string, data: unknown = {}) =>
  apiResponseSchema({
    success: true,
    message,
    data,
    errors: [],
  });

export const apiErrorResponseSchema = (
  message: string,
  errors: string[] = [message],
) =>
  apiResponseSchema({
    success: false,
    message,
    data: {},
    errors,
  });
