import { AxiosError } from "axios";

/**
 * we need to sanitize error messages, so that no sensitive data is leaked
 */
const getCleanErrorMessage = (error: any) => {
    let errorMessage = "Something went wrong!";

    if (error instanceof AxiosError) {
        errorMessage = error?.response?.data?.message ?? errorMessage;
    }

    if (typeof error == 'string') {
        errorMessage = error;
    }

    return errorMessage;
}

const removeFirstZeroChar = (input: string) => {
    if (input.startsWith('0')) {
        return input.substring(1);
    }

    return input;
}

export {
    getCleanErrorMessage,
    removeFirstZeroChar,
}