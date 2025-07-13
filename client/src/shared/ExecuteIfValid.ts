import type { z, ZodError, ZodObject, ZodRawShape } from "zod"
import type { AlertColor } from "@mui/material"
import { useSnackbar } from "../context/SnackBar"

/**
 * Executes a post function only if the provided payload passes Zod schema validation.
 *
 * @template T - The shape of the Zod object schema.
 * @param payload - The data to validate.
 * @param zodSchema - A ZodObject schema used to validate the payload.
 * @param PostFunction - The function to call if validation succeeds. Receives the parsed data.
 * @returns A promise that resolves to `true` if the payload was valid and the post function was called, otherwise `false`.
 */
const ExecuteIfValid = async  <T extends ZodRawShape>(
    payload: unknown,
    zodSchema: ZodObject<T>,
    PostFunction: (payload: z.infer<ZodObject<T>>) => Promise<unknown>): Promise<{ data: any, success: boolean, _type?: string }> => {
    const result = zodSchema.safeParse(payload)
    if (result.success) {
        const data: any = await PostFunction(result.data)
        console.log({ data })

        // newtwork error
        if (data?.code === "ERR_NETWORK") {
            return { data: "Network Error", success: false, _type: "error" }
        }

        // SS Error
        if (data?.response?.data?.message) {
            console.log(data.response.data.message)
            return { data: data.response.data.message, success: false, _type: "error" }
        }

        // Send Response
        return { data, success: true, _type: "success" }
    }

    const errorMessages = (result.error as ZodError<any>).errors.map(
        (err) => err.message
    );
    return { data: errorMessages as string[], success: false, _type: "error_array" }

}

/**
 * A custom React hook that returns a reusable form submit handler with validation and user feedback.
 * 
 * It validates the payload using a Zod schema, posts the data if valid, and shows a snackbar message for success or error.
 *
 * @returns An object containing the `handleSubmit` function.
 *
 * @example
 * ```ts
 * // Login.ts
 * import { useHandleSubmitProxy } from './path/to/handlers';
 * import { LoginSchema, LoginSchemaType } from './validations';
 * import { login } from './api';
 *
 * export const useLogin = () => {
 *   const { handleSubmit } = useHandleSubmitProxy();
 *
 *   const onSubmit = async (payload: LoginSchemaType) => {
 *     await handleSubmit(
 *       payload,
 *       LoginSchema,
 *       login
 *     );
 *   };
 *
 *   return { onSubmit };
 * };
 * ```
 */
export const useHandleSubmitProxy = (
) => {
    const { showSnackbar } = useSnackbar()

    /**
 * Handles form submission with schema validation and user feedback.
 *
 * @template T - The shape of the Zod object schema.
 * @param payload - The data to validate.
 * @param zodSchema - A ZodObject schema to validate the payload.
 * @param PostFunction - Function to call if validation succeeds.
 */
    const handleSubmit = async <T extends ZodRawShape>(
        payload: unknown,
        zodSchema: ZodObject<T>,
        PostFunction: (payload: z.infer<ZodObject<T>>) => Promise<unknown>,
        snackbarMessage: string,
        snackbarSeverity: AlertColor
    ) => {
        const hasPosted = await ExecuteIfValid(payload, zodSchema, PostFunction)
        if (hasPosted.success && hasPosted._type === "success") {
            showSnackbar(
                snackbarMessage,
                snackbarSeverity)
            return { data: hasPosted.data }
        }
        if (hasPosted._type === "error_array") {
            showSnackbar(hasPosted.data[0], "error");
        }
        if (hasPosted._type === "error") {
            showSnackbar(
                hasPosted.data || "Something went wrong",
                "error"
            )
        }
        return { data: hasPosted.data }
    }
    return { handleSubmit }

}