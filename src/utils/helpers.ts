import { AxiosError } from "axios";
import ITeam from "src/contract/models/team";
import { IUser } from "src/contract/models/user";

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

function toTitleCase(text: string) {
    // Split the text into an array of words
    const words = text.split(' ');

    // Capitalize the first letter of each word
    const capitalizedWords = words.map(word => {
        const firstLetter = word.charAt(0).toUpperCase();
        const restOfWord = word.slice(1).toLowerCase();

        return firstLetter + restOfWord;
    });

    // Join the capitalized words back into a sentence
    const result = capitalizedWords.join(' ');

    return result;
}

function getUserAvatar(userData: IUser) {
    return (userData?.photo) ? userData.photo : "/images/avatars/default-user.png";
}

function getUserRoleName(team?: ITeam) {
    const teamName = team?.teamName ?? "";
    const mapRole = [{ title: "Seafarer", value: "Candidate" }, { title: 'Company', value: 'Recruiter' }];
    const newValue = mapRole.find(e => e.title == teamName);

    return newValue ? newValue.value : teamName;
}

export {
    getCleanErrorMessage,
    removeFirstZeroChar,
    toTitleCase,
    getUserAvatar,
    getUserRoleName,
}