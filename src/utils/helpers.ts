import { AxiosError } from "axios";
import { AppConfig } from "src/configs/api";
import ITeam from "src/contract/models/team";
import { IUser } from "src/contract/models/user";
import { HttpClient } from "src/services";
import authConfig from 'src/configs/auth'
import secureLocalStorage from "react-secure-storage";
import localStorageKeys from "src/configs/localstorage_keys";
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

function formatIDR(amount: number) {
    const options: Intl.NumberFormatOptions = {
        style: 'currency',
        currency: 'IDR',
    };

    return new Intl.NumberFormat('id-ID', options).format(amount);
}

function isDevelopment() {
    return AppConfig.appEnv == "DEV";
}

function isStaging() {
    return AppConfig.appEnv == "STAGING";
}

function isProduction() {
    return AppConfig.appEnv == "PROD";
}
 async function refreshsession(){
  await HttpClient.get(authConfig.meEndpoint).then(async response => { 
    secureLocalStorage.setItem(localStorageKeys.userData, response.data.user)
  })
 }
export {
  getCleanErrorMessage,
  removeFirstZeroChar,
  toTitleCase,
  getUserAvatar,
  getUserRoleName,
  formatIDR,
  isStaging,
  isDevelopment,
  isProduction,
  refreshsession,
}